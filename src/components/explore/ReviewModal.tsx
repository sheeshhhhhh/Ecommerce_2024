import { CartitemData } from "@/types/next-auth"
import Image from "next/image"
import { FormEvent, useMemo } from "react"
import toast from "react-hot-toast"
import { TbCurrencyPeso } from "react-icons/tb"

type ReviewModalProps = {
    shippingInfo: any,
    selectedCart: CartitemData[]
}

const ReviewModal = ({
    shippingInfo,
    selectedCart
} : ReviewModalProps) => {
  const totalPrice = useMemo(() => {
    return selectedCart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0)
  }, [])

  const handleOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/create-stripe', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          shippingInfo: shippingInfo,
          totalPrice: totalPrice,
          selectedCart: selectedCart
        })
      })

      const data = await res.json()
      
      window.open(data, '_blank')

    } catch (error: any) {
        toast.error(error.message)
    }
    
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg z-40 animate-in zoom-in-75 duration-300">
      <form
      onSubmit={handleOrder}
      >
        <div className="flex">
          <div className="flex flex-col items-center gap-2 p-4">
            <h1 className="font-bold text-2xl mb-1">Review Order</h1>
      
            <label className="block mb-1">
              <h2 className="mb-1 font-semibold">Full Name</h2>
              <p className="w-[300px] h-[36px] px-3 py-1 border-[1px] border-input-border rounded-md mb-1
              placeholder:text-input-border">
                {shippingInfo.name}
              </p>
            </label>

            <label className="block mb-1">
              <h2 className="mb-1 font-semibold">Full Address</h2>
              <p className="w-[300px] px-3 py-1 border-[1px] border-input-border rounded-md mb-1
              placeholder:text-input-border">
                {shippingInfo.address}
              </p>
            </label>

            <label className="block mb-1">
              <h2 className="mb-1 font-semibold">Phone Number</h2>
              <p className="w-[300px] h-[36px] px-3 py-1 border-[1px] border-input-border rounded-md mb-1
              placeholder:text-input-border">
                {shippingInfo.phoneNumber}
              </p>
            </label>

            <div className="flex flex-col items-start gap-2 mt-1 w-[300px]">

              <div className="flex">
                <h2 className="font-semibold text-lg mr-1">Shipping method:</h2>
                <p>{shippingInfo.shippingMethod}</p>
              </div>

              <div className="flex">
                <h2 className="font-semibold text-lg mr-1">Payment method:</h2>
                <p>{shippingInfo.paymentMethod}</p>
              </div>

            </div>
          </div>

          <div className="p-4 py-8">
            <h2 className="font-bold text-xl mb-3 ">Your Cart</h2>
            <div className="flex flex-col gap-2 overflow-y-auto w-[300px] h-[300px]">
              {selectedCart.map((item) => {
                
                return (
                  <div className="flex gap-2" key={item.id}>
                    <div>
                      <Image
                      className="size-[50px]"
                      width={50}
                      height={50} 
                      src={item.item.Photo} 
                      alt="" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-medium">{item.item.name}</h2>
                      <div className="flex items-center">
                        <p className="mr-1">Total Price:</p>
                        <TbCurrencyPeso size={16} />
                        <p>{item.item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end items-center">
              <h2 className="mr-1">OverAll Price: </h2>
              <TbCurrencyPeso size={20} />
              <p>{totalPrice}</p>
            </div>
          </div>
        </div>
        
        <div className="my-1 flex justify-center">
          <button 
          className="text-lg p-2 w-[300px] rounded-md bg-[#555555cc]"
          type="submit">
              Check Out
          </button>
        </div>

      </form>
    </div>
  )
}

export default ReviewModal