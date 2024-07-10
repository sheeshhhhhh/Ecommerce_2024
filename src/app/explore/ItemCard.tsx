import type { Item } from "@prisma/client"
import Image from "next/image"
import { TbCurrencyPeso } from "react-icons/tb";

type ItenCardProps = {
    item: Item
}

const ItemCard = ({ item }: ItenCardProps) => {


    return (
        <div className="w-[200px] flex flex-col items-center bg-white p-2 rounded-md shadow-lg shadow-slate-300">
            <div>
                <Image
                className="w-[180px] min-h-[180px] max-h-[180px]"
                width={150}
                height={150}
                src={item.Photo} 
                alt="" 
                />
            </div>
            <div className="flex flex-col w-full gap-1">
                <h2 className="mx-1 font-semibold">{item.name}</h2>
                {item?.category !== null && <p>#{item.category}</p>}
                <div className="flex items-center">
                    <TbCurrencyPeso size={20} />
                    <p>{item.price}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemCard