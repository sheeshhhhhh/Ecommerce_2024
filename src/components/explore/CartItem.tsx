import type { CartItem, Item } from "@prisma/client"


type CartItemProps = {
  Item: CartItem
}

const CartItem = ({
  Item
}: CartItemProps ) => {
  

  return (
    <div className="mx-auto">
      <div className="flex-col">
        <h2>{Item.}</h2>
      </div>
    </div>
  )
}

export default CartItem