import { Item } from "@prisma/client"
import Image from "next/image"
import { TbCurrencyPeso } from "react-icons/tb"

type ItemInfoProps = Partial<Item> & {}

const ItemInfo = ({
    item_id,
    Photo,
    name,
    category,
    description,
    price,
    quantity,
    createAt
}: ItemInfoProps) => {

  // add to cart function or action add it
  const encodedPhoto = Photo && encodeURI(Photo)

  return (
    <div className="flex w-full bg-white mt-2">
      <div 
      aria-label="Photo"
      className="max-w-[480px] w-[100%] p-[15px]"
      >
        <div className="size-[450px] flex flex-col">
          <Image
          height={450}
          width={450} 
          src={encodedPhoto || ""}
          alt=""
          />
        </div>
        <div>
          {/* Make a Slider Here later on so that the usr can choose the photo to view */}
        </div>
      </div>
      <div 
      aria-label="item-info"
      className="pt-5 pl-5 pr-[35px] w-full"
      >
        <h2 className="font-semibold text-xl">
          {name}
        </h2>
        <div className="mt-[10px] flex">
          <div className="text-[#555555cc] flex">
            <h3 className="pr-3">Category</h3>
            <p className="text-black">{category ? category : "None"}</p>
          </div>
          {/* Put ratings and sold here */}
        </div>
        <div 
        className="px-5 py-[15px] bg-[#fafafa] mt-[10px]"
        aria-label="price"
        >
          <div className="flex items-center">
            <h2 className="text-lg">Price: </h2>
            <TbCurrencyPeso size={33} />
            <h2 className="font-bold text-3xl">{price}</h2>
          </div>
        </div>
        <div className="mt-[25px] px-4 ">
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
                  className="size-[32px] border-[1px] flex justify-center">
                    -
                  </button>
                  <input 
                  className="w-[50px] h-[32px] px-[2px] py-[1px] border-[1px]"
                  type="number" 
                  />
                  <button
                  className="size-[32px] border-[1px] flex justify-center">
                    +
                  </button>
                </div>
                <h3 className="text-sm">{quantity} pieces available</h3>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemInfo