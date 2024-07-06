"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getCartItems(userId: string) {
    // return await prisma.user.findMany({
    //     where: {
    //         id: userId
    //     },
    //     include: {
    //         cartItems: true,
    //     }
    // })
    return null
}