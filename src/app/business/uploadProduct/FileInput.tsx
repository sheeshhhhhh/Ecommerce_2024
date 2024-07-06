"use client";

import { handleDragOver, handleDrop, handleFileChange } from "@/utils/FileInput_util";
import { useRef, useState } from "react";

const FileInput = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className='p-3'>
            <div className='w-[300px]'>
                <label
                className="" 
                htmlFor="FileInput">
                    <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, setFile, setSelectedPhoto, fileInputRef)}
                        className="h-[300px] border-2 border-dashed flex items-center justify-center"
                    >
                        {selectedPhoto ? <img src={selectedPhoto} alt="Selected" className="max-h-full max-w-full" /> : "Upload Here"}
                    </div>
                    <input
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e, setFile, setSelectedPhoto)}
                        hidden 
                        name="Photo"
                        id='FileInput' 
                        type="file" 
                    />
                </label>
            </div>
        </div>
    );
};

export default FileInput;
