import { CartItem, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json()
    const session = await getServerSession(authoptions)
    if(!session?.user.id) return NextResponse.json({ error : "Not Authenticated"})

    const { itemQuantity, item_id, price} = body
    
    if(!itemQuantity || !item_id || !price) return NextResponse.json({ error: "please fill in the fields"})
    
    const addToCartTransaction = await prisma.$transaction(async (txprisma) => {
        const cartExist = await txprisma.cart.findFirst({
            where: {
                userInfoId: session?.user.userInfo?.id
            },
            select: {
                id: true,
                cartItem: {
                    select: {
                        itemId: true
                    }
                }
            }
        })
        
        if(cartExist) {
            // if cart Exist

            // check if the item exist in the cart
            const itemIntheCart = cartExist?.cartItem.find((item) => item.itemId === item_id )

            // if item already exist in the cart we just increment it
            if(itemIntheCart) return await txprisma.cartItem.update({
                where: {
                    itemId: item_id
                }, 
                data: {
                    quantity: {
                        increment: itemQuantity
                    }
                }
            })

            // create item in the cart if not yet existed in the cart
            const createCartItem = await txprisma.cartItem.create({
                data: {
                    cartId: cartExist.id,
                    itemId: item_id,
                    quantity: itemQuantity
                }
            })

            return createCartItem as CartItem
        } else {
            // if cart Does not exist
            const createCart = await txprisma.cart.create({
                data: {
                    userInfoId: session?.user.userInfo.id
                }   
            })

            const createCartItem = await txprisma.cartItem.create({
                data: {
                    cartId: createCart.id,
                    quantity: itemQuantity,
                    itemId: item_id
                }
            })

            return createCartItem as CartItem
        }
    })

    return NextResponse.json(addToCartTransaction)
} 

export async function GET(req: NextRequest) {
    const session = await getServerSession(authoptions)

    if(!session?.user?.userInfo?.id) return NextResponse.json({ error : "Not Authenticated"})

    const getCart = await prisma.cart.findFirst({
        where: {
            userInfoId: session.user.userInfo.id
        },
        select: {
            id: true,
            createdAt: true,
            cartItem: {
                select: {
                    id: true,
                    quantity: true,
                    cartId: true,
                    item: true
                }
            }
        }
    })
    
    return NextResponse.json(getCart)
}
