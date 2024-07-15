"use client"
import { hasError } from "@/utils/hasError"
import { profileInfoType } from "./page"
import Input from "@/components/Input"
import { useState } from "react"
import { Gender } from "@prisma/client"
import toast from "react-hot-toast"
import ChangeGender from "./ChangeGender"
import ChangeBirthday from "./ChangeBirthday"
import SaveEditProfile from "./SaveEditProfile"
import removeNBigInt from "@/utils/removeNBigInt"

type EditProfileInfoProps = {
    profileInfo: profileInfoType
}

const EditProfileInfo = ({
    profileInfo
}: EditProfileInfoProps) => {
    if(hasError(profileInfo)) return

    const [profile, setProfile] = useState<any>({
        id: profileInfo.id,
        image: profileInfo.image || "",
        name: profileInfo.name || "",
        email: profileInfo.email || "",
        userInfo: {
            phoneNumber: removeNBigInt(profileInfo.userInfo?.phoneNumber),
            address: profileInfo.userInfo?.address || "",
            gender: profileInfo.userInfo?.gender || "",
            birthday: profileInfo.userInfo?.birthday || ""
        }
    })
    
    // make phoneNumber Input a component of it's own
    const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newPhoneNumber = e.target.valueAsNumber;
        
        if(newPhoneNumber.toString().length > 11 && !isNaN(newPhoneNumber)) return toast.error("11 digits max")
        setProfile((prevProfile: any) => ({
          ...prevProfile,
          userInfo: {
            ...prevProfile.userInfo,
            phoneNumber: newPhoneNumber
          }
        }));
    };

    return (
        <div className="flex flex-col">
            <div>
                <Input 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                value={profile.name}
                name="name" 
                label="Name" 
                />
            </div>
            <div>
                <Input 
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                value={profile.email}
                name="email" 
                label="Email" 
                />
            </div>
            <div>
                <Input 
                onChange={(e) => handleChangePhoneNumber(e)}
                value={profile.userInfo.phoneNumber}
                name="phoneNumber" 
                label="Phone Number" 
                type="number"
                />
            </div>
            <div>
                <Input 
                onChange={(e) => setProfile({ ...profile, userInfo: { ...profile.userInfo, address: e.target.value}})}
                value={profile.userInfo.address}
                name="address" 
                label="Main Address" 
                />
            </div>
            <ChangeGender 
            profile={profile}
            setProfile={setProfile}
            gender={profile.userInfo.gender} 
            />
            <ChangeBirthday 
            profile={profile}
            setProfile={setProfile}
            birthday={profile.userInfo.birthday}
            />
            <SaveEditProfile
            profileInfo={profileInfo}
            profile={profile}
            setProfile={setProfile}
            />
        </div>
    )
}

export default EditProfileInfo