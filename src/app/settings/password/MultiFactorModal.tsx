"use client"
import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { changeMultifactor, getAuthProvider } from "./password.action"
import toast from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

type MultiFactorModalProps = {
    id: string,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

const MultiFactorModal = ({
    id,
    setModalOpen
} : MultiFactorModalProps) => {
    const [password, setPassword] = useState<string>('')

    // get and check session
    const session = useSession()
    if(!session?.data?.user?.id) return

    const handleMultifactor = async (e: FormEvent<HTMLFormElement>) => {
       try {
        e.preventDefault()

        const result = await changeMultifactor(id, password)

        if('error' in result) throw new Error(result.error)
        
            
        toast.success("multifactor is now " + (result.multifactor ? "on" : "off"), {
            position: 'top-center',
            duration: 2000
        })
       } catch (error: any) {
        toast.error(error.message, {
            position: 'top-center'
        })
       }
    }

    //get the provider
    const { data: provider } = useQuery({
        queryKey: ['getProvider'],
        queryFn: async () => await getAuthProvider(session?.data?.user?.id),
        enabled: !!session?.data?.user?.id // only runs when userId is available
    })
    if(provider !== undefined &&'error' in provider!) return toast.error(provider.error)// handling the error
    // if provider.account[0] exist then find that but if not then it is credentials for sure
    const authProvider =  provider?.accounts[0] ? provider?.accounts[0].provider : 'credentials'

    // do not render yet while authProvider is undefined
    if(!authProvider || !provider) return

    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center">
            
            <div onClick={() => setModalOpen(false)}
            className="h-screen w-full bg-black opacity-50 absolute z-20 animate-in fade-in-20">
            </div>

            <form 
            onSubmit={handleMultifactor}
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

                {authProvider === 'credentials' && <Input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                label="Password"
                />}

                <SubmitButton>Enable Multi Factor</SubmitButton>

            </form>
        </div>
    )
}

export default MultiFactorModal