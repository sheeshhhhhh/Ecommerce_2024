"use client"
import { getCartItems } from "@/serverActions/getCartItems";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

const CartsModal = ({
    size
} : {
    size: number
}) => {
    const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
        <PiShoppingCartSimpleBold
        onClick={() => setOpen(true)}
        size={size} 
        />
        {open && <ViewCartModal open={open} setOpen={setOpen} />}
    </div>
  )
}

const ViewCartModal =  ({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const session = useSession()
    // if(!session?.data?.user) return setOpen(false)

    return (
        <div className="fixed h-screen w-full inset-0 z-20 overflow-hidden">
            <div onClick={() => setOpen(prev => !prev)}
            className="bg-black opacity-50 h-screen w-full z-20 absolute"></div>
            <div className={`w-[300px] bg-white z-30 relative 
            transition-transform duration-500 ease-in delay-150`}>
                <div className="h-screen">
                    <h2 className="font-bold mb-2 text-lg">Cart</h2>
                    {/* map the catItems later but first make model for items and also carts */}
                </div>
            </div>
        </div>
    )
}

export default CartsModal