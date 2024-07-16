import { CartitemData } from "@/types/next-auth"
import type { CartItem } from "@prisma/client"

import Image from "next/image"
import QuantityHandler from "./QuantityHandler"
import { TbCurrencyPeso } from "react-icons/tb"

type CartItemProps = {
  Item: CartitemData
}

const CartItem = ({
  Item
}:  CartItemProps ) => {
  


  return (
    <div className="mx-auto my-1">
      <div className="flex justify-between w-[320px] p-1">
        <div className="flex">
          <div>
            <Image
            className="w-[65px] h-[65px]"
            width={65}
            height={65}
            alt=""
            src={Item.item.Photo}
            />
          </div>
          <div>
            <h2 className="font-medium ml-2 w-[175px]">{Item.item.name}</h2>
            {/* put info of size and design */}
            <div className="flex items-center">
              <TbCurrencyPeso size={20} />
              <h2>{Item.item.price}</h2>
            </div>
          </div>
        </div>
        <div className="h-[65px]">
          <QuantityHandler 
          price={Item.item.price}
          quantity={Item.quantity} 
          cart_id={Item.id}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem