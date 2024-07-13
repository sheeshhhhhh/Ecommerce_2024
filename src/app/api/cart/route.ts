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
            }
        })

        if(cartExist) {
            // if cart Exist
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

    if(!session?.user.id) return NextResponse.json({ error : "Not Authenticated"})

    const getCart = await prisma.cart.findFirst({
        where: {
            userInfoId: session.user.userInfo.id
        },
        select: {
            id: true,
            createdAt: true,
            cartItem: {
                select: {
                    quantity: true,
                    cartId: true,
                    item: true
                }
            }
        }
    })
    
    console.log(getCart)
 // not yet tested and need to get the item info 
    return NextResponse.json(getCart)
}
