import { useState } from "react"
import { POST } from "../api/cart/route"
import toast from "react-hot-toast"

type ItemInfoClientProps = {
    price: number | undefined,
    quantity: number | undefined
    item_id: string | undefined
}

const IteminfoClient = ({
    item_id,
    quantity,
    price
}: ItemInfoClientProps) => {
    const [orderquantity, setOrderQuantity] = useState<number>(1)

    const handleAddtoCart = async () => {
        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    item_id,
                    itemQuantity: orderquantity,
                    price: price // no sure if this is neede might remove soon
                }),
                credentials: 'include'
            })

            const Cart = await res.json()
            
            setOrderQuantity(1)
            toast.success("added to cart")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-[25px] px-4">
            <div className="flex flex-col gap-4">
                <div className="flex min-h-[40px]">
                    <div>
                    <h2 className="w-[110px]">Design</h2>
                    </div>
                    <div className="flex basis-[515px] flex-wrap max-h-[220px] max-w-[515px]">
                    {/* map the designs that is available with pl-10 p-2 border-[1px] mt-2 mr-2 and make the photo absolute 80x40*/}
                    </div>
                </div>
                <div className="flex min-h-[40px]">
                    <div>
                    <h2 className="w-[110px]">Size</h2>
                    </div>
                    <div className="flex basis-[515px] flex-wrap max-h-[220px] max-w-[515px]">
                    {/* map the size that is available with p-2 border-[1px] flex justify-center mt-2 mr-2*/}
                    </div>
                </div>
                <div className="mt-4 flex justify-start">
                    <h3 className="w-[110px]">Quantity</h3>
                    <div className="flex items-center">
                    <div className="flex mr-[15px] items-center">
                        <button
                        onClick={() => setOrderQuantity((prev) => prev - 1 >= 1 ? prev - 1 : prev)}
                        className="size-[32px] border-[1px] flex justify-center">
                        -
                        </button>
                        <input 
                        onChange={(e) => setOrderQuantity(e.target.valueAsNumber)}
                        value={orderquantity}
                        className="w-[50px] h-[32px] px-[2px] py-[1px] border-[1px] text-center"
                        type="number" 
                        />
                        <button
                        onClick={() => setOrderQuantity((prev) => prev + 1)}
                        className="size-[32px] border-[1px] flex justify-center">
                        +
                        </button>
                    </div>
                        <h3 className="text-sm">{quantity} pieces available</h3>
                    </div>
                </div>
            </div>
            <div className="mt-[15px]">
                <div className="flex gap-[15px]">
                    <button
                    onClick={() => handleAddtoCart()}
                    className="px-5 h-[48px] w-[180px] border-[1px] flex shadow-xl
                    justify-center items-center bg-[#e7e7e7] hover:border-black"
                    >
                        Add to Cart
                    </button>
                    <button
                    className="px-5 h-[48px] w-[180px] flex justify-center shadow-xl
                    items-center bg-slate-300 font-semibold hover:bg-slate-200"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IteminfoClient