"user client"

import { Gender } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"

type ChangegenderProps = {
    profile: any,
    gender?: Gender,
    setProfile: Dispatch<SetStateAction<any>>
}

const ChangeGender = ({
    profile,
    gender,
    setProfile
} : ChangegenderProps) => {

    const preselectedGender = ['Male', 'Female', 'Others']

    const handleSetGender = (gender: string) => {
        setProfile({ ...profile, userInfo: {
            ...profile.userInfo, gender: gender
        }})
    }

    return (
        <div className="my-2">
            <div className="mb-1">
                <h2 className="font-bold">Gender</h2>
            </div>
            <div className="pl-4 flex">
                {preselectedGender.map((genderInfo, idx) => {
                    const selected = gender === genderInfo
                    return (
                        <button 
                        onClick={() => handleSetGender(genderInfo)}
                        key={idx} 
                        className="flex mr-3 items-center"
                        >
                            <div className={`mr-2 rounded-full border-[2px] border-[#555555cc] size-5
                            ${selected && 'border-black'} flex justify-center items-center`}>
                                { selected && <div className="size-2 rounded-full bg-black"></div>}
                            </div>
                            <h3>{genderInfo}</h3>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ChangeGender