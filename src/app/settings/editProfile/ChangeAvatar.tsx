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
    <div className="flex flex-col items-center gap-3 w-[180px] p-3">
      <div className="p-1 border-[3px] border-[#555555cc] rounded-full">
        {encodedUrl && <Image 
        className="w-[65px] h-[65px] rounded-full bg-white"
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
              console.log(res)
              const handleAvatar = await handleChangeAvatar(res[0].url, id, Url || '')
              if(!handleAvatar.image) throw new Error("failed to upload image") 
              setUrl(handleAvatar.image)
              toast.success("Avatar Changed", {
                position: 'top-center'
              })
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