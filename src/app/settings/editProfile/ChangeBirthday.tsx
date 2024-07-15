"use client"

import { getMonth } from "@/utils/getMonthString"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"

type ChangeBirthdayProps = {
    birthday: string | null,
    setProfile: Dispatch<SetStateAction<any>>,
    profile: any
}

const monthByNumberFormat = [
    
]

const ChangeBirthday = ({
    birthday,
    setProfile,
    profile,
} : ChangeBirthdayProps ) => {
    // change day and change year is easy

    
    // birthdat format 24_03_2004
    
    const handleChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
        setProfile({
            ...profile,
            userInfo: {
                ...profile.userInfo,
                birthday: e.target.value
            }
        })
    }

    return (
        <div className="my-2">
            <div className="mb-1">
                <h2 className="font-bold">Date of birth (optional)</h2>
            </div>
            <div className="flex pl-4 gap-6">
                <input 
                className="px-3 py-1 font-medium bg-transparent pb-2 border-b-[1px] 
                border-[#555555cc] outline-none"
                onChange={handleChangeBirthday}
                value={birthday || ""}
                type="date" 
                />
            </div>
        </div>  
    )
}

export default ChangeBirthday