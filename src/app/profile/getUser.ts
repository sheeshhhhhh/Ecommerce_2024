"use server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function getUser(id: string | undefined) {
    if(!id) return 

    const getUserInfo = await prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true,
            image: true,
            createdAt: true,
            userInfo: {
                where: {
                    userId: id
                },
                select: {
                    phoneNumber: true,
                    address: true,
                    gender: true,
                    birthday: true
                }
            }
        }
    })

    return getUserInfo
}
