"use client"
import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { deleteAccount, getAuthProvider } from "./password.action"
import { AuthProviderResponse } from "@/types/next-auth"

type DeleteModalProps = {
    id: string,
    setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteModal = ({
    id,
    setDeleteModalOpen
} : DeleteModalProps) => {
    const [password, setPassword] = useState<string>("")
    const [authProvider, setAuthProvider] = useState<string>("")

    const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const handledelete = await deleteAccount(authProvider, id, password)
            
            console.log(handledelete)
        } catch (error: any) {
            toast.error(error)
        }
    }

    useEffect(() => {
        const handleAuthProvider = async () => {
            try {
                const AuthProvider: AuthProviderResponse = await getAuthProvider(id)

                if('error' in AuthProvider) throw new Error(AuthProvider.error)
                
                // if use credentials // there is no account provider if you use credentials
                if(!AuthProvider?.accounts[0]) return setAuthProvider('credentials')

                // if use google auth
                setAuthProvider(AuthProvider.accounts[0].provider)
            } catch (error: any) {
                toast.error(error.message)
            }
        }
        handleAuthProvider()
    }, [])

    if(!authProvider) return

    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center">
            
            <div
            onClick={() => setDeleteModalOpen(false)} 
            className="h-screen w-full bg-black opacity-50 absolute z-20 animate-in fade-in-20">
            </div>

            <form
            onSubmit={handleDeleteAccount}
            className="w-[350px] px-5 py-4 shadow-xl gap-2 bg-white rounded-lg z-30
            animate-in fade-in-0 zoom-in-75"
            >
                
                <div className="flex flex-col items-start mb-2 cursor-default">
                    <h2 className="font-bold text-xl mb-2">Delete Account</h2>
                    <span className="text-red-600 text-sm">Warning Deleting your account is a permanent action.</span> 
                    <p className="text-sm text-[#555555cc]">
                        if you want to just take off time by shutting off your account. You can just deactivate it
                    </p>
                </div>

                {authProvider === 'credentials' &&
                <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                label="Password"
                />}

                <div className="flex justify-center items-center my-2">
                    <SubmitButton>
                        Delete Account
                    </SubmitButton>
                </div>

            </form>

        </div>
    )
}

export default DeleteModal