"use client"

import { useState } from "react"
import { handleCartQuantity } from "./Cart.action"

type QuantityHandlerProp = {
    quantity: number,
    cart_id: string
}

const QuantityHandler = ({
    quantity,
    cart_id
} : QuantityHandlerProp) => {
    const [cartQuantity, setCartQuantity] = useState<number>(quantity)

    const handleQuantity = async (nextquantity: number) => {
        const quantity = await handleCartQuantity(nextquantity, cart_id)

        setCartQuantity(quantity)
    }

    return (
        <div className="flex items-center">
            <button
            onClick={() => handleQuantity(cartQuantity + 1)}
            className="size-5 h-6 flex flex-col justify-center items-center
            border-[1px]">
                +
            </button>
            <input 
            className="w-[30px] text-center border-[1px] h-6"
            onChange={(e) => setCartQuantity(e.target.valueAsNumber)}
            value={cartQuantity}
            type="number"
            />
            <button
            onClick={() => handleQuantity(cartQuantity - 1)}
            className="size-5 h-6 flex flex-col justify-center items-center
            border-[1px]">
                -
            </button>
        </div>
    )
}

export default QuantityHandler