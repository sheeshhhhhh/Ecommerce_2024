"use client"

import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"
import { useState } from "react"

const ChangeLogo = ({ Url } : { Url: string}) => {
    const [url, setUrl] = useState<string>(Url)

    return (
        <div className="w-[150px] flex flex-col items-center gap-2 relative">
            <Image 
            className="rounded-full size-[120px]"
            width={120}
            height={120}
            src={url} 
            alt="Logo"
            />
            <UploadButton
            config={{
                mode: "auto"
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
                console.log(res)
                setUrl(res[0].url)
            }}
            />
        </div>
    )
}

export default ChangeLogo