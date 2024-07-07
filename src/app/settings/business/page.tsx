import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import CreateBusiness from "./CreateBusiness"
import BusinessDashBoard from "./BusinessDashBoard"

const page = async () => {

  const getBusiness = async () => {
    "use server"
    const session = await getServerSession(authoptions)
    const userinfo = session?.user
    const prisma = new PrismaClient()

    if(!userinfo) return { error: "Not Authenticated" }

    const businessInfo = await prisma.business.findFirst({
      where: {
        ownerId: userinfo.id
      }
    })

    return businessInfo
  }

  const business = await getBusiness()

  return (
    <div>
      <div className='my-4 pl-14'>
        <h2 className='text-2xl font-bold'>Business</h2>
      </div>
      <div className='py-12 px-10'>
        <div className='w-[600px]'>
          {!business && <CreateBusiness /> } 
          {business && <BusinessDashBoard />}
        </div>
      </div>
    </div>
  )
}

export default page