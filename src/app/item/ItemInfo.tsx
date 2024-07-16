"use client"

import { Item } from "@prisma/client"
import Image from "next/image"
import { TbCurrencyPeso } from "react-icons/tb"
import IteminfoClient from "./ItemInfo.client"


type ItemInfoProps = Partial<Item> & {}

const ItemInfo = ({
    item_id,
    Photo,
    name,
    category,
    description,
    price,
    quantity,
    createdAt
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
          className="size-[450px]"
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
        <IteminfoClient 
        item_id={item_id}
        quantity={quantity}
        price={price}
        />
      </div>
    </div>
  )
}

export default ItemInfo