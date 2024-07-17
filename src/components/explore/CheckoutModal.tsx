"use client"

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import Input from "../Input"
import { getShippingInfo } from "./Cart.action"
import removeNBigInt from "@/utils/removeNBigInt"
import { CartitemData } from "@/types/next-auth"
import ReviewModal from "./ReviewModal"

type CheckoutModalwithButtonProps = {
    selectedCart: CartitemData[] | undefined
}

const CheckoutModalwithButton = ({
    selectedCart
} : CheckoutModalwithButtonProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="flex justify-center">
            <button
            disabled={selectedCart?.length === 0}
            onClick={() => setOpenModal(true)}
            className="w-[250px] bg-[#555555cc] p-3 font-bold rounded-lg mt-3 shadow-xl
            hover:text-white transition-colors duration-300"
            >
                {/* might want to create A modal or redirect */}
                Check Out
            </button>
            <CheckOutModal 
            selectedCart={selectedCart}
            openModal={openModal} 
            setOpenModal={setOpenModal}  
            />
        </div>
    )
}
// all the types will be in types/next-auth.d.ts
enum paymentMethod {
    'Cash On Delivery',
    'Online Payment'
}

interface CheckOutModalProps extends CheckoutModalwithButtonProps {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const CheckOutModal = ({
    openModal,
    setOpenModal,
    selectedCart
} : CheckOutModalProps) => {
    const [reviewModal, setReviewModal] = useState<boolean>(false)
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        address: "",
        phoneNumber: 9,
        shippingMethod: "",
        paymentMethod: "Cash On Delivery", // default
    })

    useEffect(() => {
        // for getting the basic userInfo
        const getUser = async () => {
            const user = await getShippingInfo()
            if(!user?.name || !user.userInfo?.phoneNumber || !user.userInfo.address) return

            setShippingInfo({
                ...shippingInfo, 
                name: user?.name,
                phoneNumber: removeNBigInt(user.userInfo?.phoneNumber) || 9,
                address: user.userInfo.address
            })
        }    
        getUser()
    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type } = e.target
        setShippingInfo({
            ...shippingInfo,
            [name]: type === 'number' ? e.target.valueAsNumber : e.target.value
        })
    }

    const handleReview = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setReviewModal(true)
    }

    const handleCancelModal = () => {
        reviewModal ? setReviewModal(false) : setOpenModal(false)
    }

    const shippingselection = ['lalamove', 'J&T Express', 'SPCX Express']

    if(!openModal || !selectedCart) return 

    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center">
            
            <div onClick={() => handleCancelModal()}
            className="absolute h-screen w-full bg-black opacity-50 z-30 animate-in fade-in-20">
            </div>

            {
            reviewModal ?
            <ReviewModal 
            shippingInfo={shippingInfo}
            selectedCart={selectedCart}
            />
            :
            <div className="w-[450px] p-4 shadow-md bg-white rounded-lg z-40 animate-in zoom-in-75 duration-300">
                <form
                onSubmit={handleReview}
                className="flex flex-col gap-2 items-center">
                    <h1 className="font-bold text-xl mb-1">Shipping Information</h1>

                    <Input 
                    onChange={(e) => handleOnChange(e)}
                    value={shippingInfo.name}
                    name="name" 
                    label="Full Name" />
                    {/* add option in adress later his save adress */}
                    <Input 
                    onChange={(e) => handleOnChange(e)}
                    value={shippingInfo.address}
                    name="adress" 
                    label="Full Address" />
                    <Input 
                    type="number"
                    onChange={(e) => handleOnChange(e)}
                    value={shippingInfo.phoneNumber}
                    name="phoneNumber" 
                    label="Phone Number" 
                    />

                    <div aria-label="shipping method">
                        <div className="flex justify-start w-[280px] mb-1">
                            <h2 className="font-bold text-lg">Shipping method</h2>
                        </div>
                        <div className="flex items-center mt-2">
                           {shippingselection.map((method) => {
                                const selected = method === shippingInfo.shippingMethod

                                return (
                                    <div onClick={() => setShippingInfo({...shippingInfo, shippingMethod: method})}
                                    className="mx-2 flex cursor-pointer">
                                        <input 
                                        type="radio"
                                        checked={selected}
                                        name="shipping method" 
                                        />
                                        <p className={`text-[#555555cc] text-xs ml-1
                                            ${selected && 'text-black'}`}>
                                            {method}
                                        </p>
                                    </div>
                                )
                           })}
                        </div>
                    </div>

                    <div aria-label="payment method"
                    className="w-[300px]">
                        <div className="flex justify-start w-[280px] mb-1">
                           <h2 className="font-bold text-lg">Payment method</h2>
                        </div>
                        <div className="flex flex-col gap-3 ml-2">
                            <div onClick={() => setShippingInfo({...shippingInfo, paymentMethod: 'Cash On Delivery'})}
                            className="flex items-center cursor-pointer">
                                <input
                                checked={'Cash On Delivery' === shippingInfo.paymentMethod}
                                type="radio" 
                                name="payment method"
                                />
                                <p className={`text-[#555555c] ml-2
                                    ${'Cash On Delivery' === shippingInfo.paymentMethod && 'text-black'}`}>
                                    Cash On Delivery
                                </p>
                            </div>
                            <div  onClick={() => setShippingInfo({...shippingInfo, paymentMethod: 'Online Payment'})}
                            className="flex items-center cursor-pointer">
                                <input
                                checked={'Online Payment' === shippingInfo.paymentMethod}
                                type="radio" 
                                name="payment method"
                                />
                                <p className={`text-[#555555c] ml-2
                                    ${'Online Payment' === shippingInfo.paymentMethod && 'text-black'}`}>
                                    Online Payment
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button
                    type="submit"
                    className="w-[300px] p-2 bg-[#555555cc] rounded-md mt-4">
                        Review Order
                    </button>
                </form>
            </div>
            }
        </div>
    )
}

export default CheckoutModalwithButton