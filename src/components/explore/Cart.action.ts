"use server"

import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const handleCartQuantity = async (quantity: number, cartid: string): Promise<number> => {
    try {

        const updatedQuantity = await prisma.cartItem.update({
            where: {
                id: cartid
            },
            data: {
                quantity: quantity
            }
        })

        return updatedQuantity.quantity
    } catch (error) {
        console.log(error)
        return quantity
    }
}

export const handleDeleteCart = async (idArr: string[]) => {

    if(!idArr) return
    
    
    const deleteTransaction = await prisma.$transaction(async (txprisma) => {
        try {

            await Promise.all(
                idArr.map(async (id) => {
                    return txprisma.cartItem.delete({
                        where: {
                            id: id
                        }
                    });
                })
            );
            
            return idArr

        } catch (error) {
            return 
        }
    })

    return deleteTransaction
}

export const getShippingInfo = async () => {
    const session = await getServerSession(authoptions)
    
    if(!session?.user) return redirect('/api/auth/signIn')

    return await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            name: true,
            userInfo: {
                select: {
                    address: true,
                    phoneNumber: true
                }
            }
        }
    })
}

