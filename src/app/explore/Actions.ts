import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient()

export const getItems = async (page: number, search?: string) => {
    if(page <= 0) return 

    const limit = 20
    const skip = limit * (page - 1) 
    
    if(!search) return await prisma.item.findMany({
        skip: skip,
        take: limit
    })

    return await prisma.item.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
        skip: skip,
        take: limit
    })
}

export const ViewItem = async (item_id: string) => {
    
    if(!item_id) return

    const item = await prisma.item.findUnique({
        where: {
            item_id: item_id,
        },
        include: {
            business:true
        }
    })

    if(!item) return redirect('/error')

    return item
}

export const AddtoCard = async (item_id: string) => {
    // decide later whether the session is parameter or be get in here

    if(!item_id) return 

    // const orderItem = await prisma.orderItem.create({
    //     data: {
    //         price: 'TODO LATER',
    //         quantity: 'TODO LATER',
    //         item_id: item_id,
    //         order_id: 'TODO LATER',
    //     }
    // })

    // if(!orderItem) return { errro : "failed to order item"}
}
