"use server"
import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export async function UploadProduct(formData: FormData) {
    const session = await getServerSession(authoptions)
    if(!session?.user?.businessId) return

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const priceStr = formData.get("price") as string
    const quantityStr = formData.get("quantity") as string
    const Photo = formData.get("Photo") as string
    

    if(!name || !priceStr || !quantityStr || !Photo ) return

    const price = parseInt(priceStr)
    const quantity = parseInt(quantityStr)
    if (isNaN(price) || isNaN(quantity)) return

    const uploadItem = await prisma.item.create({
        data: {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            Photo: Photo,
            businessId: session.user.businessId
        }
    })

    if(!uploadItem) return

    console.log(uploadItem)
    redirect(`/item/${uploadItem.item_id}`)
    //DO LATED redirect to newly created product or to the business profile
}