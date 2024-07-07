"use client"

import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"
import { useState } from "react"

const CoverPhoto = () => {
    const [url, setUrl] = useState<string>()

    return (
        <div className="w-[300px] flex flex-col items-center gap-2 ">
            <div>
                {url && <Image
                width={300}
                height={100}
                src={url} alt="CoverPhoto"
                />
                }
                {!url && 
                <div className="w-[300px] h-[100px] flex justify-center items-center
                font-bold bg-[#d8dfdf]">
                    <h2>Cover Photo (Optional)</h2>
                </div>
                }
            </div>
            <div className="w-[150px]">
                <UploadButton 
                config={{
                    mode: 'auto'
                }}
                endpoint='imageUploader'
                onClientUploadComplete={(res: any) => {
                    console.log(res)
                    setUrl(res[0].url)
                }}
                />
                <input
                onChange={() => "OnclientUploadComplete is gonna handle the change"}
                value={url}
                name="CoverPhoto" 
                hidden
                type="text"
                />
            </div>
        </div>  
    )
}

export default CoverPhoto