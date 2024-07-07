"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const SideBar = () => {
    const settingTab = ["editProfile", "business", "password"]
    const pathname = usePathname()
    const urlLastElement = pathname.slice(10, pathname.length)

    return (
        <div className='flex justify-end w-full max-w-[700px] pt-8'>
            <div className='w-[130px]'>
                <div className='p-1  mb-2'>
                    <h2 className='text-2xl font-bold'>Settings</h2>
                </div>
                <div className='flex flex-col gap-2 px-2'>
                    {settingTab.map((url, idx) => {
                        const selected = urlLastElement === url
                        
                        return (
                            <Link 
                            className={`font-medium text-[#555555cc] hover:text-[#363535e8] ${selected && 'text-black font-semibold'}`}
                            key={idx} href={`/settings/${url}`}>
                                <h2>{url}</h2>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default SideBar