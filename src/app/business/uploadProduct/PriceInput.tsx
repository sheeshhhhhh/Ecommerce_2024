"use client"

import { useState } from "react"

const PriceInput = ({...props} : React.InputHTMLAttributes<HTMLInputElement>) => {
    const [price, setPrice] = useState<number>(0)

    return (
        <div>
            <button 
            type="button"
            onClick={() => setPrice(prev => prev - 1)}
            className="text-2xl font-bold mx-2">-</button>

            <input 
            {...props}
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            className="w-[85px] h-[40px] px-2 outline-none border-[2px] border-input-border rounded-md" 
            type="number" />

            <button 
            type="button"
            onClick={() => setPrice(prev => prev + 1)}
            className="text-2xl font-bold mx-2">+</button>
        </div>
    )
}

export default PriceInput