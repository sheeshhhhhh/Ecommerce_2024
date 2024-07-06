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
                <div className='bg-white w-[700px] p-7 rounded-lg'>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-bold '>Profile</h2>
                        <p className='text-input-border'>
                            Profile Info Manage Account? {" "}
                            <Link 
                            className='text-blue-700 font-medium hover:underline hover:underline-offset-2'
                            href={'/settings/profile'}>
                                Edit Profile
                            </Link>
                        </p>
                    </div>
                    <div className='p-3 pl-16 flex flex-col gap-2'>
                        <h2 className='text-lg font-bold'>{userInfo?.name}</h2>
                        <h2 className='text-lg font-bold'>{userInfo?.email}</h2>                        
                    </div>
                    <div className='ml-2'>
                        <h2 className='text-xl font-bold'>Private Info</h2>
                        {
                            userInfo.userInfo && <PrivateInfo privateInfo={userInfo.userInfo} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page