import { getServerSession } from 'next-auth'

import NavBar from '@/components/NavBar'
import { authoptions } from '../api/auth/[...nextauth]/route'
import { getUser } from './getUser'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import PrivateInfo from './PrivateInfo'
import { Gender } from '@prisma/client'


export type privateInfoType = {
    phoneNumber: number | null,
    address: string | null,
    gender: Gender | null,
    birthday: string | null,
}

export interface UserInfoType  {
    name: string | null;
    email: string | null;
    image: string | null;
    createdAt: Date;
    userInfo: privateInfoType | null;
}

const page = async () => {
    const session = await getServerSession(authoptions)
    if(!session) return redirect('/')

    const getuser = await getUser(session?.user.id)
    if(!getuser) return
    const userInfo: UserInfoType = getuser
    
    return (
        <div className='min-h-screen '>
            <NavBar userInfo={session?.user} />
            <div className='p-10 flex justify-end pt-32 mx-[250px]'>    
                {/* put the cart here in the side */}
                <div className='bg-white w-[700px] p-7 rounded-lg'>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-bold '>Profile</h2>
                        <p className='text-input-border'>
                            Profile Info Manage Account? {" "}
                            <Link 
                            className='text-blue-700 font-medium hover:underline hover:underline-offset-2'
                            href={'/settings/editProfile'}>
                                Edit Profile
                            </Link>
                        </p>
                    </div>
                    <div className='p-3 pl-16 flex flex-col gap-2'>
                        {/* Make avatar here later */}
                        <div className='flex gap-2 items-center'>
                            <h2 className='text-[#555555cc] font-bold text-lg w-[56.22px]'>Name: </h2>
                            <p className='font-semibold'>{userInfo?.name}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <h2 className='text-[#555555cc] font-bold text-lg w-[56.22px]'>Email: </h2>
                            <p className='font-semibold'>{userInfo?.email}</p>
                        </div>                     
                    </div>
                    <div className='ml-2'>
                        <h2 className='text-xl font-bold'>Private Info</h2>
                        <p className='text-input-border mb-3'>These are your private informations</p>
                        <PrivateInfo privateInfo={userInfo.userInfo} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page