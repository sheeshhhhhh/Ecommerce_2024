import { getServerSession } from 'next-auth'
import { stripe } from '@/utils/stripe'
import { authoptions } from '../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authoptions)
    if(!session?.user?.id || !session.user.userInfo.id) return NextResponse.json('User is not authenticated', { status : 400})

    const body = await req.json()

    const { totalPrice, shippingInfo, selectedCart } = body // remove total price later

    const lineItem = await Promise.all(selectedCart.map(async (item: any) => {
        
        const product = await stripe.products.create({
            name: item.item.name,
            description: item.item.description,
            images: [item.item.Photo],
            metadata: {
                itemId: item.item.item_id
            }
        })

        const price = await stripe.prices.create({
            unit_amount: item.item.price * 100,
            currency: 'php',
            product: product.id
        })

        return {
            price: price.id,
            quantity: item.quantity
        }
    }))

    const customerEmail = session.user.email ? { customer_email: session.user.email } : {}

    const paymentsession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItem,
        ...customerEmail, // this is for email
        success_url: process.env.CLIENT_URL,
        cancel_url: process.env.CLIENT_URL,
        metadata: {
            userInfoId: session.user.userInfo.id,
            address: shippingInfo.address,
            phoneNumber: shippingInfo.phoneNumber,
            shippingMethod: shippingInfo.shippingMethod,
            paymentMethod: shippingInfo.paymentMethod,
            totalPrice: totalPrice
        }
    })


    return NextResponse.json(paymentsession.url, { status : 200 })
}