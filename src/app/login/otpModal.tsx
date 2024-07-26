"use client"

import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from "react"

type OtpModalProps = {
    setModal: Dispatch<SetStateAction<boolean>>
}

const OtpModal = ({
    setModal
} : OtpModalProps) => {
    const [otp, setOtp] = useState<string []>(Array(6).fill(''))

    const handleotpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {

        setOtp([...otp.map((data, idx) => (idx === index ? e.target.value : data))])

        // Focus the next input element if value is not empty and next sibling exists
        if(e.target.value && e.target.nextSibling) {
            (e.target.nextSibling as HTMLInputElement).focus()
        }

    }

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'ArrowRight' && e.currentTarget.nextSibling) {
            (e.currentTarget.nextSibling as HTMLInputElement).focus()
        } else if (e.key === 'ArrowLeft' && e.currentTarget.previousSibling) {
            (e.currentTarget.previousSibling as HTMLInputElement).focus()
        }
    }

    return (
        <div className="fixed h-screen w-full top-0 left-0 flex justify-center items-center">
            
            <div onClick={() => setModal(false)}
            className="h-screen w-full bg-black opacity-50 absolute z-20 animate-in fade-in-20">
            </div>

            <form
            className="w-[400px] flex flex-col px-7 py-6 shadow-xl gap-2 items-center bg-white rounded-lg
            z-30 animate-in fade-in-20 zoom-in-75"
            >
                
                <div className="flex flex-col items-start mb-2 cursor-default">
                    <h2 className="font-bold text-lg">2FA Authentication</h2>
                    <p className="text-sm">
                        We send you a 6 digit otp code you need to put in
                        the input so that you will lo gin
                    </p>
                </div>
                
                <div aria-label="otp Input" 
                className="flex gap-2">
                    {otp.map((value, idx) => {
                        
                        return (
                            <input
                            key={idx}
                            onKeyDown={handleKey}
                            autoFocus={idx === 0} // auto focus on the first element
                            value={value}
                            onChange={(e) => handleotpChange(e, idx)}
                            type="text" 
                            maxLength={1} 
                            className="h-[40px] w-[40px] outline-none border-[2px] text-center
                            rounded-md"
                            />
                        )
                    })}
                </div>

            </form>
        </div>
    )
}

export default OtpModal