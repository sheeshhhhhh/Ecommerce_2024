"use client"
import Input from "@/components/Input"
import { changePassword } from "./password.action"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"


type ChangePasswordModalProps = {
    id: string,
}

type passwordInfoTypes = {
    password: string,
    newPassword: string,
    confirmPassword: string
}

const ChangePasswordModal = ({
    id
} : ChangePasswordModalProps) => {
    const [passwordInfo, setPasswordInfo] = useState<passwordInfoTypes>({
        password: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await changePassword(id, passwordInfo.password,
            passwordInfo.newPassword, passwordInfo.confirmPassword)
            
        console.log(result)
        if(result?.error) return toast.error(result.error, { position: 'top-center' })
    }

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target

        setPasswordInfo({
            ...passwordInfo,
            [name]: e.target.value
        })
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-full
        flex justify-center items-center">
            <form 
            className="w-[400px] flex flex-col px-7 py-6 shadow-xl
            gap-2 items-center bg-white rounded-lg"
            onSubmit={handleChangePassword}>

                <div className="flex flex-col items-start mb-2">
                    <h2 className="font-bold text-lg">Change Password</h2>
                    <p className="text-sm ">
                        You have the right to change you password as many times as you 
                        want.  
                        <span className="text-red-600 text-sm">Warning: Can't change password if you use Oauth</span>
                    </p>
                </div>

                <Input 
                type="password"
                value={passwordInfo.password}
                onChange={(e) => handleChangeEvent(e)}
                name="password" 
                label="Password" 
                />

                <Input 
                type="password"
                value={passwordInfo.newPassword}
                onChange={(e) => handleChangeEvent(e)}
                name="newPassword" 
                label="New Password" 
                />

                <Input 
                type="password"
                value={passwordInfo.confirmPassword}
                onChange={(e) => handleChangeEvent(e)}
                name="confirmPassword" 
                label="Confirm Password" 
                />

                <button 
                className="w-[250px] bg-[#555555cc] p-2 rounded-lg shadow-lg font-bold"
                type="submit"
                >
                    Change Password
                </button>

            </form>
        </div>
    )
}

export default ChangePasswordModal