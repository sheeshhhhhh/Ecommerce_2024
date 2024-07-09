
import { PrismaClient } from "@prisma/client"
import type { Order } from '@prisma/client'

import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

import NoOrder from "./NoOrder"
import OrderCards from "./OrderCards"

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
        Orders: true
      }
    })

    return orders
  }

  const { Orders }: any = await getOrders()

  if(!Orders) return <NoOrder />

  return (
    <div className="bg-white p-6 mx-2 w-[900px] rounded-lg">
      <div>
        <h2 className="font-bold text-2xl mx-4 ">Orders in {}</h2>
      </div>
      <div>
        {Orders.map((order: Order) => (
          <div className="border-t-[1px] border-t-[#555555cc]">
            <OrderCards Order={order} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page