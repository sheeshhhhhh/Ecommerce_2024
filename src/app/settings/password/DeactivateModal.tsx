"use client"

import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import { deactivateAccount } from "./password.action"

type DeactivateModalProps = {
    id: string,
    setDeactivateModalOpen: Dispatch<SetStateAction<boolean>>
}

const DeactivateModal = ({
    id,
    setDeactivateModalOpen
} : DeactivateModalProps) => {
    
    const handleDeactivateAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const handleDeactivate = await deactivateAccount(id);

            if(handleDeactivate?.error) throw new Error(handleDeactivate?.error)

            toast.success('Account deactivated')
            //redirect to login later
        } catch (error: any) {
            toast.error(error)
        }
    }

    return (
        <div className='fixed top-0 left-0 h-screen w-full flex justify-center items-center'>
            
            <div 
            onClick={() => setDeactivateModalOpen(false)}
            className="h-screen w-full bg-black opacity-50 absolute z-20 animate-in fade-in-20">
            </div>

            <form
            onSubmit={handleDeactivateAccount}
            className="w-[350px] px-5 py-4 shadow-xl gap-2 bg-white rounded-lg z-30 
            animate-in fade-in-0 zoom-in-75">
                
                <div className="flex flex-col items-start mb-2 cursor-default">
                    <h2 className="font-bold text-lg">Deactivate Account</h2>
                    <p className="text-sm text-[#555555cc]">
                        Deactivating your account means no one can visit your profile and 
                        business but you can recover it any time
                    </p>
                </div>

                <div className="flex justify-center my-2">
                    <SubmitButton
                    >
                        Deactivate Account
                    </SubmitButton>
                </div>

                <div className="flex justify-center my-2">
                    <button
                    onClick={() => setDeactivateModalOpen(false)}
                    type="button"
                    className="h-[40px] w-[250px] border-[2px] border-[#555555cc] p-2 font-bold shadow-md rounded-lg
                    hover:bg-[#555555cc] hover:text-white transition-[background] transition-color duration-300">
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    )
}

export default DeactivateModal