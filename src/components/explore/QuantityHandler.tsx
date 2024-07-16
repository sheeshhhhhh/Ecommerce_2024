"use client"

import { useState } from "react"
import { handleCartQuantity } from "./Cart.action"
import { TbCurrencyPeso } from "react-icons/tb"

type QuantityHandlerProp = {
    quantity: number,
    cart_id: string,
    price: number
}

const QuantityHandler = ({
    quantity,
    cart_id,
    price
} : QuantityHandlerProp) => {
    const [cartQuantity, setCartQuantity] = useState<number>(quantity)

    const handleQuantity = async (nextquantity: number) => {
        if(nextquantity <= 0) return // do remove Item later

        const quantity = await handleCartQuantity(nextquantity, cart_id)

        setCartQuantity(quantity)
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex justify-start items-center pl-2">
                <TbCurrencyPeso size={20} />
                <h2>{price * cartQuantity}</h2>
            </div>
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
        </div>
    )
}

export default QuantityHandler