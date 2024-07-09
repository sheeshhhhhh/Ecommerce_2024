import Image from 'next/image'
import { GiShop } from "react-icons/gi";

const NoOrder = () => {
  return (
    <div className='bg-white p-6 mx-2 w-[900px] rounded-lg flex justify-center' >
        <div className='w-[500px] h-[350px] p-7 flex flex-col items-center py-9' >
            <h2 className='font-bold text-3xl text-[#555555cc]' >
                No Order
            </h2>
            <div >
                <GiShop 
                size={215}
                className='text-[#555555cc]' 
                />
            </div>
        </div>
    </div>
  )
}

export default NoOrder