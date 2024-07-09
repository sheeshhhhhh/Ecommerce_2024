"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()


export const updateBusinessinfo = async (businessId: string, formData: FormData) => {
    if(!businessId || !formData) return 

    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const contactNumber = formData.get('contactNumber') as string
    const email = formData.get('email') as string

    if(!contactNumber) return "Contact Number is required"

    const prismaUpdateBusinessinfo = await prisma.business.update({
        where: {
            id: businessId
        },
        data: {
            description: description,
            contactNumber: contactNumber,
            category: category,
            email: email
        }
    })

    if(!prismaUpdateBusinessinfo) throw new Error("error in the updateBusinessinfo action")


    return revalidatePath('/settings/business')
}