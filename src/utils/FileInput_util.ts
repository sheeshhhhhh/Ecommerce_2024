import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';

export type fileOnDragEvent = React.DragEvent<HTMLDivElement>;

export const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: Dispatch<SetStateAction<any>>,
    setSelectedPhoto: Dispatch<SetStateAction<any>>,
) => {
    if (!e.target.files) return; // to handle undefined   
    const file = e.target.files[0];
    setFile(file);

    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setSelectedPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    }
};

export const handleDrop = (
    e: fileOnDragEvent,
    setFile: Dispatch<SetStateAction<any>>,
    setSelectedPhoto: Dispatch<SetStateAction<any>>,
    fileInputRef: RefObject<HTMLInputElement>,
) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files[0];
    setFile(droppedFiles);

    if (droppedFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setSelectedPhoto(e.target.result);
        };
        reader.readAsDataURL(droppedFiles);

        // just get from chatGPT
        if(fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(droppedFiles)
            fileInputRef.current.files = dataTransfer.files
        }
    }
};

export const handleDragOver = (e: fileOnDragEvent) => {
    e.preventDefault();
};
