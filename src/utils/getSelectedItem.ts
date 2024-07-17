import { CartitemData } from "@/types/next-auth"

// this is for getting the info of cartItems using selectedCart so when you click something we will automatically get that
const getSelectedItem = (selectedCart: string[], cartItems?: CartitemData[]) => {
  if (!cartItems) return undefined;

  const CartItems = cartItems.filter(cartItem => {
    return selectedCart.includes(cartItem.id)
  })

  return CartItems
}

export default getSelectedItem