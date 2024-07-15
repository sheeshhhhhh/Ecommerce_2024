import Input from "@/components/Input"
import SubmitButton from "@/components/SubmitButton"
import { Dispatch, SetStateAction } from "react"

type DeactivateModalProps = {
    id: string,
    setDeactivateModalOpen: Dispatch<SetStateAction<boolean>>
}

const DeactivateModal = ({
    id,
    setDeactivateModalOpen
} : DeactivateModalProps) => {

    

    return (
        <div className='fixed top-0 left-0 h-screen w-full flex justify-center items-center'>
            
            <div 
            className="h-screen w-full bg-black opacity-50 absolute z-20 animate-in fade-in-20">
            </div>

            <form
            className="w-[350px] px-5 py-4 shadow-xl gap-2 bg-white rounded-lg z-30 
            animate-in fade-in-0 zoom-in-75">
                
                <div className="flex flex-col items-start mb-2 cursor-default">
                    <h2 className="font-bold text-lg">Deactivate Account</h2>
                    <p className="text-sm text-[#555555cc]">
                        Deactivating your account means no one can visit your profile and 
                        business but you can recover it any time
                    </p>
                </div>

                <Input 
                type="password"
                name="password"
                label="Password"
                />

                <div className="flex justify-center mt-2">
                    <SubmitButton>
                        Deactivate Account
                    </SubmitButton>
                </div>
            </form>

        </div>
    )
}

export default DeactivateModal