"use server"
import { utapi } from "@/app/api/uploadthing/core";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const handleChangeAvatar = async (url: string, id: string, previousUrl?: string) => {
    const prismaTransaction = await prisma.$transaction(async (txprisma) => {
        if(previousUrl) {
            const photoCustomId = previousUrl.substring(18)
            // delete the file
            const deleteFile = await utapi.deleteFiles(photoCustomId)
            console.log(deleteFile)
        }

        const updateAvatar = await txprisma.user.update({
            where: {
                id: id
            },
            data: {
                image: url
            },
            select: {
                image: true
            }
        })

        return updateAvatar
    })

    return prismaTransaction
}