"use client"

import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { ChangeEvent, FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { verifylogin } from "./login.actions"
import OtpModal from "./otpModal"

type loginInfoType = {
    username: string,
    password: string
}

type LoginFormProps = { 
    callbackUrl?: string
}

const LoginForm = ({
    callbackUrl
} : LoginFormProps) => {
    const [modal, setModal] = useState<boolean>(false)
    const [loginInfo, setLoginInfo] = useState<loginInfoType>({
        username: '',
        password: ''
    })

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    const handleonSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 

        try {
            if(!loginInfo.username || !loginInfo.password) {
                throw new Error('Please fill in all fields')
            }

            const result = await verifylogin(loginInfo.username, loginInfo.password, callbackUrl)
            
            if(!result) return

            if('error' in result) throw new Error(result.error)
            
            if('message' in result) {
                if(result.message === 'multifactor is on') return setModal(true)

                signIn('credentials', {
                    username: loginInfo.username,
                    password: loginInfo.password,
                    callbackUrl: callbackUrl || 'http://localhost:3000/'
                })
            }
        } catch (error: any) {
            toast.error(error.message, { position: 'top-center' })
            console.log('Error in the handleSubmit in login ', error.message)
        }
    }
    
    return (
        <form
            onSubmit={handleonSubmit}
            className="bg-white py-6 px-8 rounded-xl"
        >
            <div className="pl-2 mb-3">
                <h2 className="uppercase font-bold text-3xl">Login</h2>
            </div>

            <div className="flex flex-col gap-2 my-1">
                <Input 
                    onChange={handleChangeEvent}
                    value={loginInfo.username}
                    name="username"
                    label="Username"
                />

                <Input 
                    onChange={handleChangeEvent}
                    type="password"
                    value={loginInfo.password}
                    name="password"
                    label="Password"
                />
                
            </div>

            <div className="flex justify-center mt-3">
                <SubmitButton>
                    Login
                </SubmitButton>
            </div>
            {modal && <OtpModal setModal={setModal} />}
        </form>
    )
}

export default LoginForm
