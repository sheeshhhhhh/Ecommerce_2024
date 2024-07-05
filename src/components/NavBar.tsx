"use client"
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import Settings_Icon from '../../public/Settings_Icon.svg'
import Logout_Icon from '../../public/Logout_Icon.png'

const NavBar = ({
    userInfo
} : {
    userInfo?: User
}) => {

  return (
    <div className='flex bg-transparent mx-40 p-2 justify-between items-center '>
        <Link href={'/'}
        aria-label='Logo' className='cursor-pointer'>
            <h2 className='font-bold text-3xl'>Ecommerce</h2>
        </Link>
        <div className=''>
            {userInfo ? 
            <UserIcon image={userInfo?.image} name={userInfo?.name} /> : 
            <Link 
            className='font-semibold text-xl hover:underline'
            href={'/api/auth/signin'}>Login</Link>}   
        </div>
    </div>
  )
}

const UserIcon = ({
    image,
    name
} : {
    image?: string | null,
    name?: string | null
}) => {

    return(
        <details className=''>
            <summary className='block'>
                <Image
                className='rounded-full'
                src={image ? image : ''} 
                alt={name ? name : 'usericon'} 
                />
            </summary>
            <div className='bg-white p-2 pr-4 rounded-md flex flex-col gap-1 absolute'>
                <div aria-label=''>

                </div>
                <div 
                className='px-2 hover:bg-gray-400 rounded-md'
                aria-label='Settings'>
                    <Link 
                    className='font-semibold flex items-center'
                    href={'/settings'}>
                        <Image 
                        className='size-[20px] mr-1'
                        src={Settings_Icon} alt="" />
                        settings 
                    </Link>
                </div>
                <div 
                className='px-2 hover:bg-gray-400 rounded-md'
                aria-label='Log out'>
                    <button
                    className='font-semibold flex items-center'
                    onClick={() => signOut()}
                    >
                        <Image 
                        className='size-[20px] mr-1'
                        src={Logout_Icon} alt="" />
                        Log out
                    </button>
                </div>
            </div>
        </details>
    )
}

export default NavBar