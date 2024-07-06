import Image from 'next/image'
import React from 'react'

import Ecommerce_Header from '../../../public/Ecommerce_Header.png'
import Link from 'next/link'

const HomeHeader = () => {
  return (
    <div className='p-36 bg-[#119bbe]'>
        <div className='mx-auto flex items-center gap-6 justify-center'>
            <div className='h-[500px] overflow-hidden flex items-center'>
                <Image 
                className='w-[650px] '
                src={Ecommerce_Header} alt='' />
            </div>
            <div className='flex flex-col w-[400px]'>
                <h2 className='font-bold text-3xl mb-3'>What is Ecommerce?<br /> And why you should Shop here?</h2>
                <p className='font-medium text-lg'>Ecommerce is a online Shopping company that will make your shopping experience 
                    better and faster. We Deliver the products in an average of 1 day per order and max is a week.
                    We are also making sure your private data is safe and preventing scammer as much as possible.
                </p>
                <Link className='p-4 w-[200px] ml-4 mt-5 rounded-full bg-white font-bold text-lg text-center
                hover:bg-gray-300'
                href={'/explore'}>
                    Explore
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HomeHeader