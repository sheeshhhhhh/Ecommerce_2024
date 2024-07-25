
import { PrismaClient } from "@prisma/client"
import type { Item, Order, OrderItem } from '@prisma/client'

import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

import NoOrder from "./NoOrder"
import OrderCards from "./OrderCards"

export interface OrderItemType extends Partial<OrderItem> {
  order: {
    address: string,
    paymentMethod: string,
    shippingMethod: string
  }
  item: Item
} 

const page = async () => {

  const getOrders = async () => {
    "use server" 
    const session = await getServerSession(authoptions)
    if(!session) return

    const prisma = new PrismaClient()

    const orders = await prisma.business.findMany({
      where: {
        ownerId: session.user.id
      },
      select: {
        OrderItem: {
          select: {
            orderItem_id: true,
            price: true,
            quantity: true,
            order_id:true,
            order: {
              select: {
                paymentMethod: true,
                shippingMethod: true,
                address: true
              }
            },
            item: true,
            businessId: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    })
    
    return orders[0].OrderItem
  }

  const Orders: OrderItemType[] | undefined = await getOrders()

  if(!Orders) return <NoOrder />

  return (
    <div className="bg-white p-6 mx-2 w-[900px] rounded-lg">
      <div className="mb-5">
        <h2 className="font-bold text-2xl mx-4 ">Orders in {}</h2>
      </div>
      <div className="flex flex-col gap-1 px-6">
        {Orders.map((order: OrderItemType) => (
          <div key={order.orderItem_id} className="border-t-[1px] border-t-[#555555cc] py-2">
            <OrderCards Order={order} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page