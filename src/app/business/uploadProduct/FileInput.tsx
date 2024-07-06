"use client";

import { UploadDropzone } from '@/utils/uploadthing'
import { useState } from 'react';

const FileInput = () => {
    const [url, setUrl] = useState<string>("")
    console.log(url)
    return (
    <div className="w-[300px] border-dashed border-[2px] rounded-lg">
      <UploadDropzone
        config={{
            mode: 'auto'
          }}
        className='h-[300px]'
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          // Do something with the response
          console.log(res)
          setUrl(res[0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <input // this is to catch the value of the photo
      name='Photo'
      value={url}
      onChange={() => console.log("just nothing")}
      hidden
      type='text'
      />
    </div>
    );
};

export default FileInput;
