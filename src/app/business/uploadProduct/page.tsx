import Input from '@/components/Input'
import React from 'react'
import PriceInput from './PriceInput'
import FileInput from './FileInput'

const page = () => {


    return (
        <div className='h-screen flex justify-center items-center'>
            <form 
            className='flex gap-2 bg-white p-4 rounded-lg' 
            action="/api/upload">
                <div className='bg-white h-[320px] w-full'>
                    <FileInput />
                </div>
                <div>
                    <Input name='name' label='name' />
                    <Input name='description' label='description' />
                    <div className='flex gap-3 mb-3'>
                        <label className='w-[150px] font-semibold' htmlFor="price">
                            <span className='ml-8'>Price</span>
                            <PriceInput id='price' name='price' />
                        </label>
                        <label className='w-[150px] font-semibold' htmlFor="price">
                            <span className='ml-8'>Quantity</span>
                            <PriceInput id='price' name='quantity' />
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <button
                        className='border-[1px] border-[#aaa] p-2 w-[200px] rounded-lg
                        hover:bg-[hsla(0,0%,93%,.8)] transition-[background]'
                        type='submit'
                        > 
                        Sell 
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default page