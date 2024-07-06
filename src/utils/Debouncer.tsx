"use client"
import { useEffect, useState } from "react"


function Debouncer(value: string, delay: number)  {
    const [debounceValue, setDebounceValue] = useState<string>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        
        return () => {
            clearTimeout(handler)
        };
    }, [value, delay]) 

    return debounceValue
}

export default Debouncer