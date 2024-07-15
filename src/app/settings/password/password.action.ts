"use server"
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt, { compareSync } from 'bcrypt'
import { verify } from "crypto";

const prisma = new PrismaClient();

// make verifying password a function 

export const changePassword = async (id: string, previousPassword: string, newPassword: string, confirmPassword: string) => {

    if(!previousPassword || !newPassword || !confirmPassword) return { error: "Please fill in all the fields"}
    
    const getUser = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            password: true,
            accounts: {
                select: {
                    provider: true
                }
            }
        }
    }) // it also get the account to confirm if it's google oauth and return error if it is

    if(getUser?.accounts[0].provider === 'google' ) return { error : "Can't Change Password of Oauth"}

    if(newPassword !== confirmPassword) return { error : "Password not the same" }

    if(!getUser?.password) return { error : "Couldn't find User" }

    const verifyPassword = bcrypt.compareSync(previousPassword, getUser.password)

    if(!verifyPassword) return { error : "Wrong Password" }

    const updatePassword = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: newPassword
        }
    })

    console.log(updatePassword) // later to be tested if we can use if(!wupdatepassword) for handling faield update
}

export const deleteAccount = async (password: string, id: string) => {
    const getUser = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            password: true
        }
    })

    if(!getUser?.password) return { error : "Can't find User" }

    const verifyPassword = bcrypt.compareSync(password, getUser.password)

    if(!verifyPassword) return { error : "Wrong Password" }

    const deleteAccount = await prisma.user.delete({
        where: {
            id: id
        }
    })
    
    console.log(deleteAccount)
    // redirect to login or explore or home
}

export const deactivateAccount = async (password: string, id: string) => {
    const getUser = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            password: true
        }
    })

    if(!getUser?.password) return { error : "Can't find User" }

    const verifyPassword = bcrypt.compareSync(password, getUser.password)

    if(!verifyPassword) return { error : "Wrong Password" }

    // const deactivateUser = await prisma.user.update({
    //     where: {
    //         id: id
    //     },
    //     data: {
    //         deactivate: true
    //     }
    // })

    // console.log(deactivateUser)
    // if(!deactivateUser) return { error : "Failed to deactivate Account" }

    // redirect to login or home
}