"use client"
import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { Dispatch, SetStateAction, useState } from "react"

type MultiFactorModalProps = {
    id: string,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

const MultiFactorModal = ({
    id,
    setModalOpen
} : MultiFactorModalProps) => {
    const [password, setPassword] = useState<string>('')


    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center">
            
            <div onClick={() => setModalOpen(false)}
            className="h-screen w-full bg-black opacity-50 absolute z-20 animate-in fade-in-20">
            </div>

            <form 
            className="w-[400px] flex flex-col px-7 py-6 shadow-xl gap-2 items-center bg-white rounded-lg 
            z-30 animate-in fade-in-20 zoom-in-75">
                
                <div className="flex flex-col items-start mb-2 cursor-default">
                    <h2 className="font-bold text-lg">Multi Factor Authentication</h2>
                    <p className="text-sm">
                        The authentication code will be put in the email that you provided
                        and make sure to put it in the otp.
                        You can deactivate this by putting your password again.
                    </p>
                </div>

                <Input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                label="Password"
                />

                <SubmitButton>Enable Multi Factor</SubmitButton>

            </form>
        </div>
    )
}
export default MultiFactorModal