import ChangeAvatar from "./ChangeAvatar"
import { hasError } from "@/utils/hasError"
import NoProfile from "./NoProfile"
import EditProfileInfo from "./EditProfileInfo"
import { UserInfo } from "@prisma/client"
import { handleGetProfile } from "./ChangeAvatar.action"

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