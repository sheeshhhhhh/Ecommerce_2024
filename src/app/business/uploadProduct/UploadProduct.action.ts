"use server"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export async function UploadProduct(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const priceStr = formData.get("price") as string
    const quantityStr = formData.get("quantity") as string
    const Photo = formData.get("Photo") as string
    const BusinessId = "your-business-id-here" // Replace with actual business ID

    if(!name || !priceStr || !quantityStr || !Photo || !BusinessId) return

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
            BusinessId: BusinessId
        }
    })

    if(!uploadItem) return

    console.log(uploadItem)
    redirect(`/item/${uploadItem.item_id}`)
    //DO LATED redirect to newly created product or to the business profile
}