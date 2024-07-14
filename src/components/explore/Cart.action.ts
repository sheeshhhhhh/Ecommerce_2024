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