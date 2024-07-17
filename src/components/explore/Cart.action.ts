"use server"

import { PrismaClient } from "@prisma/client"

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
    console.log(deleteTransaction)

    return deleteTransaction
}