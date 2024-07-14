import { hasError } from "@/utils/hasError"
import { profileInfoType } from "./page"

type EditProfileInfoProps = {
    profileInfo: profileInfoType
}

const EditProfileInfo = ({
    profileInfo
}: EditProfileInfoProps) => {
    
    if(hasError(profileInfo)) return

    return (
        <div>
            {profileInfo.name}
        </div>
    )
}

export default EditProfileInfo