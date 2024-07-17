"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import CartItem from "./CartItem";
import { Cartitem, CartitemData } from "@/types/next-auth";
import { TbCurrencyPeso } from "react-icons/tb";
import { handleDeleteCart } from "./Cart.action";
import toast from "react-hot-toast";
import CheckoutModalwithButton from "./CheckoutModal";

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
    const [cartItem, setCartItem] = useState<Cartitem>()
    const [selectedCart, setSelectedCart] = useState<string[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const handleTotalPrice = (CartItem: Cartitem) => {
        setTotalPrice(0) // always reset the price

        CartItem.cartItem.forEach((item) => {
            const selected =  selectedCart.includes(item.id)
            if(!selected) return
            setTotalPrice((prev) => prev + (item.item.price * item.quantity))
        })
    }

    useEffect(() => {
        const handlegetCartItem = async () => {
            
            try {
                const res: Response = await fetch('/api/cart', {
                    method: 'GET',
                    credentials: 'include'
                })
    
                const CartItem = await res.json()
                
                handleTotalPrice(CartItem)

                setCartItem(CartItem)
            } catch (error) {
                console.log(error)
            }
        }
        handlegetCartItem()
    }, [selectedCart])

    const handleSelect = (id: string, status: string) => {
        if(status === 'unselect') {
            const arrCopy = [...selectedCart]
            const removedArr = arrCopy.filter((cartid) => id !== cartid)
            
            setSelectedCart(removedArr)
        } else {
            setSelectedCart([...selectedCart, id])
        }
    }

    const handleSelectAll = () => {
        setSelectedCart([])

        if(selectedCart.length ===  cartItem?.cartItem.length) return

        cartItem?.cartItem.forEach((item) => {
            setSelectedCart((prev) => [...prev, item.id])
        })
    }  

    const handleDelete = async (idArr: string[]) => {
        const deletedArr = await handleDeleteCart(idArr)

        if(!deletedArr) return toast.error('Failed to delete')

        deletedArr.forEach((id) => {
            const arrCopy = [...selectedCart]
            const removedArr = arrCopy.filter((cartid) => id !== cartid)
            
            setSelectedCart(removedArr)
        })
    }

    return (
        <div className="fixed h-screen w-full inset-0 z-20 overflow-hidden">
            <div onClick={() => setOpen(prev => !prev)}
            className="bg-black opacity-50 h-screen w-full z-20 absolute"></div>
                <div className={`w-[400px]  px-3 h-screen bg-white z-30 relative 
                animate-in slide-in-from-left-40 duration-500`}>
                    <div className="h-[750px]">
                        <h2 className="font-bold mb-2 text-3xl p-5 border-b-[2px] mx-3">Cart</h2>
                        {/* map the catItems later but first make model for items and also carts */}
                        <div className="flex flex-col items-center gap-4 mt-3">
                            {cartItem?.cartItem?.map((Item: CartitemData) => {

                                const selected = selectedCart.includes(Item.id)
                                
                                return (
                                    <div className="flex items-center">
                                        <input 
                                        checked={selected}
                                        className="size-5 mr-3"
                                        onChange={(e) => handleSelect(Item.id, selected ? 'unselect' 
                                        : 'select')}
                                        // value={selected} 
                                        type="checkbox" 
                                        />
                                        <CartItem Item={Item} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="h-full">
                        <div className="flex">

                            <div className="flex items-center">
                                <input 
                                checked={selectedCart.length ===  cartItem?.cartItem.length}
                                onClick={() => handleSelectAll()}
                                className="size-5" type="checkbox" />
                                <button 
                                onClick={() => handleSelectAll()}
                                className="px-[6px]">
                                    Select All ({cartItem?.cartItem.length})
                                </button>
                            </div>

                            <div>
                                <button 
                                onClick={() => handleDelete(selectedCart)}
                                className="py-[1px] px-[6px] mx-2 hover:underline hover:underline-offset-2"
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="flex items-center">
                                <h2 className="mr-1 font-medium">Total ({selectedCart.length} item):</h2>
                                <div className="flex items-center">
                                    <TbCurrencyPeso size={20} />
                                    <h1 className="font-medium">{totalPrice}</h1>
                                </div>
                            </div>

                        </div>

                        <CheckoutModalwithButton />
                        
                    </div>
            </div>
        </div>
    )
}

export default CartsModal