import Image from "next/image"
import { OrderItemType } from "./page"
import { format } from 'date-fns'

const OrderCards = ({ Order }: { Order: OrderItemType}) => {
  // to do later because we still need to handle orders no orders data yet
  
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>
          <Image 
          alt={Order.item.name}
          width={70}
          height={70}
          className="size-[70px]"
          src={Order.item.Photo}
          />
        </div>
        <div className="flex flex-col ml-3">
          <h2 className="text-lg font-bold">{Order.item.name}</h2>
          <p>Quantity: {Order.quantity}</p>
          <p className="font-medium text-[#555555cc]">{Order.order.address}</p>
        </div>
      </div>
      <div>
        <p className="font-bold text-[#555555cc]">OrderedAt: {format(Order.createdAt!, 'PPP')}</p>
        <p className="mt-1 font-medium">Payment Method: <span className="font-normal">{Order.order.paymentMethod}</span></p>
        <p className="font-medium">Shipping Method: <span className="font-normal">{Order.order.shippingMethod}</span></p>
      </div>
    </div>
  )
}

export default OrderCards