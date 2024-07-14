import { getServerSession } from "next-auth"
import ChangeAvatar from "./ChangeAvatar"
import { PrismaClient, UserInfo } from "@prisma/client"
import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { profile } from "console"
import { hasError } from "@/utils/hasError"
import NoProfile from "./NoProfile"
import EditProfileInfo from "./EditProfileInfo"

export type profileInfoType = {
  id: string
  name: string | null,
  email: string | null,
  image: string | null,
  userInfo: Partial<UserInfo> | null;
} | {
  error: string;
} 

const page = async () => {

  const handleGetProfile: any = async ():Promise<profileInfoType> => {
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

  const profileInfo: profileInfoType = await handleGetProfile()

  if(!profileInfo) return

  if(hasError(profileInfo)) return <NoProfile error={profileInfo.error} />

  
  return (
    <div>
      <div className='my-4 pl-14'>
        <h2 className='text-2xl font-bold'>Edit Profile</h2>
      </div>
      <div className='py-16 px-10 w-[680px] flex justify-between'>
        <div className='w-[400px]'>
            <EditProfileInfo 
            profileInfo={profileInfo} 
            />
        </div>
        <div aria-label="Changed-Avatar">
            <ChangeAvatar  
            id={profileInfo.id}
            Url={profileInfo.image}
            />
        </div>
      </div>
    </div>
  )
}

export default page