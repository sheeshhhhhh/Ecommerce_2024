"use client"
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

type signUpType = {
    username: string,
    password: string,
    confirmPassword: string
}

const page = () => {
    const router = useRouter()
    const [data, setData] = useState<signUpType>({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            
            const res: Response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            })

            const userInfo = await res.json()

            if(userInfo.error) throw new Error(userInfo.error)
            
            router.push('/api/auth/signin')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen w-full bg-clear-background
        flex justify-center items-center'>
            <form 
            onSubmit={handleSignUp}
            className='bg-white p-6 px-8 rounded-xl'>
                <div className='pl-2'>
                    <h2 className='uppercase font-bold text-2xl'>Sign Up</h2>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div aria-label='Username'>
                        <Input 
                        value={data.username}
                        onChange={(e) => setData({...data, username:e.target.value})}
                        name='Username' 
                        label='Username' />
                    </div>
                    <div aria-label='Password'>
                        <Input 
                        value={data.password}
                        onChange={(e) => setData({...data, password:e.target.value})}
                        type='password'
                        name='Password' 
                        label='Password'/>
                    </div>
                    <div aria-label='Confirm Password'>
                        <Input 
                        value={data.confirmPassword}
                        onChange={(e) => setData({...data, confirmPassword:e.target.value})}
                        type='password'
                        name='confirmPassword' 
                        label='Confirm Password'
                        />
                    </div>
                </div>
                <div>
                    <button 
                    className='px-4 py-3 border-[2px] border-[#aaa] rounded-lg hover:bg-[hsla(0,0%,93%,.8)] 
                    transition-all w-full'
                    type="submit"
                    >Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default page