import { stripe } from '@/utils/stripe'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY!

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const body = await req.text()
    
    const stripeSig = req.headers.get('stripe-signature')! // stripe Signature
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, stripeSig, WEBHOOK_KEY, )
    } catch (error: any) {
        console.log("Webhook signature verification failed", error.message)
        return new Response(`Webhook Error: ${error.mesage}`, { status: 400 })
    }

    //processing the payment
    try {
        switch(event.type) {
            case 'checkout.session.completed': {
                const session = await stripe.checkout.sessions.retrieve(
                    (event.data.object as Stripe.Checkout.Session).id, {
                        expand: ["line_items"]
                    }
                )
                const shippingInfo = session.metadata 
                const line_items = session.line_items?.data

                if(!line_items || !shippingInfo) return

                const order = await prisma.order.create({
                    data: {
                        address: shippingInfo.address,
                        shippingMethod: shippingInfo.shippingMethod,
                        paymentMethod: shippingInfo.paymentMethod,
                        userInfoId: shippingInfo.userInfoId,
                        totalQuantity: line_items.length,
                        totalPrice: parseInt(shippingInfo.totalPrice)
                    }
                })

                await Promise.all(line_items.map(async (item) => {
                    if(item.price?.product) {
                        const product = await stripe.products.retrieve(item.price.product as string)
        
                        const itemInfo = await prisma.item.findFirst({
                            where: {
                                item_id: product.metadata.itemId
                            }
                        })

                        const createOrderItem = await prisma.orderItem.create({
                            data: {
                                quantity: item.quantity!,
                                price: item.amount_total / 100,
                                order_id: order.order_id,
                                businessId: itemInfo?.businessId!,
                                item_id: product.metadata.itemId
                            }
                        })
                        

                        return createOrderItem
                    }
                }))

                break
            }

            default: 
                console.log('unhandled event type' + event.type)
        }
    } catch(error: any) {
        console.log('Error in proccessing the payment. Error: ' + error.message)
        return NextResponse.json(`Error in proccessing the payment. Error: ${error.message}`)
    }

    return NextResponse.json("payment Successfull", { status : 200 })
}