"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"


const BusinessNavBar = () => {
    const url = usePathname()
    const lastElementUrl = url.slice(10)
    
    return (
        <div className="w-full flex justify-center">
            <div className='flex gap-2 items-center h-[50px]'>
                <Link 
                className={`font-bold text-lg mx-3 pb-2 ${lastElementUrl === 'uploadProduct' && 
                    'border-b-[3px] border-b-blue-700 '}`}
                href={'/business/uploadProduct'}>
                    Upload Product
                </Link>
                <Link 
                className={`font-bold text-lg mx-3 pb-2 ${lastElementUrl === 'dashboard' && 
                    'border-b-[3px] border-b-blue-700'}`}
                href={'/business/dashboard'}>
                    DashBoard
                </Link>
                <Link 
                className={`font-bold text-lg mx-3 pb-2 ${lastElementUrl === 'orders' && 
                    'border-b-[3px] border-b-blue-700'}`}
                href={'/business/orders'}>
                    Orders
                </Link>
            </div>
        </div>
    )
}

export default BusinessNavBar