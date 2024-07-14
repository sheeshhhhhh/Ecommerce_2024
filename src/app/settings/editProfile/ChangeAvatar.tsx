"use client"

import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"
import { useState } from "react"
import { handleChangeAvatar } from "./ChangeAvatar.action"
import { loaderProp } from "@/components/NavBar"
import toast from "react-hot-toast"

type ChangeAvatarProps = {
  id: string
  Url: string | null
}

const ChangeAvatar = ({
  id,
  Url
} : ChangeAvatarProps) => {
  const [url, setUrl] = useState<string>(Url || '')
  const encodedUrl = url && encodeURI(url)

  return (
    <div>
      <div>
        {encodedUrl && <Image 
        className="w-[65px] h-[65px]"
        height={65}
        width={65}
        alt="Your Avatar"
        src={encodedUrl}
        />}
      </div>
      <div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res: any) => {
            try {
              const handleAvatar = await handleChangeAvatar(res[0].url, id, Url || '')
              if(!handleAvatar.image) throw new Error("failed to upload image") 
              setUrl(handleAvatar.image)
              toast.success("Avatar Changed")
            } catch (error: any) {
              toast.error('ERROR!' + error.message) 
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
          />
      </div>      
    </div>
  )
}

export default ChangeAvatar