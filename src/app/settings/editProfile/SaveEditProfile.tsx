'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { profileInfoType } from "./page"
import { hasError } from "@/utils/hasError"
import SaveButton from "../business/BusinessDashBoard/SaveButton"
import { handleChangeProfileInfo } from "./ChangeAvatar.action"
import toast from "react-hot-toast"

type SaveEditProfileProps = {
    profileInfo: profileInfoType,
    profile: any,
    setProfile: Dispatch<SetStateAction<any>>
}

const SaveEditProfile = ({
    profileInfo,
    profile,
    setProfile
} : SaveEditProfileProps) => {
    if(hasError(profileInfo)) return
    const [changed, setChanged] = useState<boolean>(true)
    // impement the function of save eddit later when every user has userInfo

    // useEffect(() => {
    //     if(profileInfo.id !== profile.id) return setChanged(true)
    //     if(profileInfo.name !== profile.name) return setChanged(true)
    //     if(profileInfo.email !== profile.email) return setChanged(true)
    //     if(profileInfo.userInfo?.phoneNumber !== profile.userInfo.phoneNumber) return setChanged(true)
    //     if(profileInfo.userInfo?.address !== profile.userInfo.address) return setChanged(true)
    //     if(profileInfo.userInfo?.birthday !== profile.userInfo.birthday) return setChanged(true)
    //     if(profileInfo.userInfo?.gender !== profile.userInfo.gender) return setChanged(true)
        
    //     setChanged(false)
    // }, [profile, profileInfo])

    const handleSave = async () => {
        const updateUser = await handleChangeProfileInfo(profile)

        if(updateUser.error) return toast.error(updateUser.error) // for error handling

        toast.success("Edited Profile", {
            position: 'top-center'
        })
    }

    const handleReset = () => {
        setProfile(profileInfo)
    }

    return (
        <div>
            <SaveButton 
            saveFunction={handleSave}
            changed={changed}
            />
        </div>
    )
}

export default SaveEditProfile