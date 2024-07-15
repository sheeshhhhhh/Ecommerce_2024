"use server"

import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { utapi } from "@/app/api/uploadthing/core";
import removeNBigInt from "@/utils/removeNBigInt";
import { PrismaClient, User, UserInfo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { profileInfoType } from "./page";

const prisma = new PrismaClient();

export const handleGetProfile: any = async ():Promise<profileInfoType> => {
    "use server"
    try {
      const prisma = new PrismaClient();

      const session = await getServerSession(authoptions)
      if(!session?.user?.id) return { error : "Not Authenticated" }
      
      const profile = await prisma.user.findUnique({
        where: {
          id: session.user.id
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          userInfo: true
        }
      })
      if(!profile) return { error : "No user Found"}

      return profile

    } catch (error) {
      console.log(error)
      return { error : "internal server Error" }
    }
  }

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

export const handleChangeProfileInfo = async (profileInfo: any ) => {
    const session = await getServerSession(authoptions)
    if(!session?.user?.id) return { error: "faield to edit Profile" }

    const prismaTransaction = await prisma.$transaction(async (txprsima) => {
        const updateUser = await txprsima.user.update({
            where: {
                id: session?.user?.id
            }, 
            data: {
                name: profileInfo.name,
                email: profileInfo.email,
            },
            select: {
                image: true,
                id: true,
                name: true,
                email: true
            }

        })

        const updateUserInfo = await txprsima.userInfo.update({
            where: {
                userId: session?.user?.id
            },
            data: {
                phoneNumber: profileInfo.userInfo.phoneNumber,
                address: profileInfo.userInfo.address,
                gender: profileInfo.userInfo.gender,
                birthday: profileInfo.userInfo.birthday
            },
            select: {
                id: true,
                userId: true,
                phoneNumber: true,
                address: true,
                gender: true,
                birthday: true,
                createdAt: true,
                updatedAt: true
            }
        })

        let user: any = updateUser
        user.userInfo = updateUserInfo
        return (user)
    })

    if(!prismaTransaction) return { error : "Failed to update in the database" }

    return prismaTransaction
}