"use server"

import { generateOTPSecret } from "@/utils/lib/GenerateOTPsecret"
import sendOTP from "@/utils/lib/sendOTP"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const verifylogin = async (username: string, password: string, callbackUrl?: string) => {
    try {
        if(!username || !password) throw new Error("fill in all the fields")

        const user = await prisma.user.findFirst({
            where: {
                name: username
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                multifactor: true
            }
        })

        if(!user) throw new Error("wrong username")

        const verifyPassword = bcrypt.compareSync(password, user.password!)

        if(!verifyPassword) throw new Error('wrong password')

        if(user.multifactor && user.email) {
            const checkOtp = await prisma.oTPRequest.findFirst({
                where: {
                    userId: user.id
                }
            })

            if(checkOtp) return { message : "multifactor is on"}
            
            const createOtp = await prisma.oTPRequest.create({
                data: {
                    userId: user.id,
                    otp: generateOTPSecret()!,
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
                }
            })

            const send = await sendOTP(user.email, createOtp.otp)
            
            return { message : 'multifactor is on'}
        } else {
            return { message : 'multifactor is off' }
        }
    } catch (error: any) {
        console.log('error in the verifylogin server action Error:', error.message)
        return  { error : error.message}
    }
}   