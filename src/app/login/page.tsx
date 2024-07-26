import React from 'react'
import LoginForm from './LoginForm'
import { getServerSession } from 'next-auth'
import { authoptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Page = async ({
    searchParams
} : {
    searchParams : {
        callbackUrl: string | undefined
    }
}) => {

    const session = await getServerSession(authoptions)
    if(session?.user) return redirect('/')

    return (
        <div className='h-screen w-full bg-clear-background flex justify-center items-center'>
            <LoginForm callbackUrl={searchParams.callbackUrl} />
        </div>
    )
}

export default Page