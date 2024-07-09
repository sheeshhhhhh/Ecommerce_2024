'use client'

import { useEffect, useState } from "react";

const SaveButton = ({
    saveFunction,
    resetFunction,
    changed
} : {
    saveFunction?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    resetFunction?: () => void,
    changed: boolean
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(changed)
    const [isAnimating, setIsAnimation] = useState<boolean>(false)

    useEffect(() => {
        if(changed) {
            // no delay because the animate in will happen
            setIsVisible(true)
            setIsAnimation(true)
        } else if(!changed) {
            // need to delat because the state will render and close it before the animation
            setIsAnimation(false)
            setTimeout(() => setIsVisible(false), 300)
        }
    }, [changed, isVisible])

    return (
        <div>
            {isVisible && 
            <div className={`mt-2 ${isAnimating ? 'animate-in zoom-in-90' : 'animate-out motion-safe:zoom-out-90'} 
            duration-500 bg-white p-2 w-[300px] rounded-lg flex justify-between px-5`}>
                <button
                className="font-bold text-lg hover:underline"
                onClick={(e) => { saveFunction ? saveFunction(e) : null }} 
                type='submit'>
                    save
                </button>
                {resetFunction && <button
                className="font-bold text-lg hover:underline"
                onClick={() => resetFunction()}
                type="button">
                    reset
                </button>}
            </div>
            }
        </div>
    )
}

export default SaveButton