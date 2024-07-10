"use client"

import { UploadButton } from '@/utils/uploadthing'
import Image from 'next/image'
import { useState } from 'react'

const LogoInput = () => {
    const [url, setUrl] = useState<string>("")

  return (
    <div className='w-[200px] flex flex-col items-center gap-2 absolute top-4 right-4'>
        <div className='rounded-full p-1 border-[3px] border-[#d8dfdf]'>
            {url && <Image 
            width={120}
            height={120}
            className='rounded-full size-[120px] min-h-[120px] min-w-[120px]'
            src={url} alt='Logo' 
            />}
            {!url && 
            <div className='size-[120px] flex justify-center items-center
            font-bold bg-[#d8dfdf] rounded-full'>
                <h2>No Logo Yet</h2>
            </div>
            }
        </div>
        <div className='w-[150px]'>
            <UploadButton
            config={{
                mode: 'auto'
            }}
            endpoint='imageUploader'
            className=''
            onClientUploadComplete={(res: any) => {
                console.log(res)
                setUrl(res[0].url)
            }}
            />
            <input
            onChange={() => "OnclientUploadComplete is gonna handle the change"}
            value={url}
            name='Logo' 
            hidden
            type="text" />
        </div>
    </div>
  )
}

export default LogoInput