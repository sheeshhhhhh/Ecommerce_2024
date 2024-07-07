import React from 'react'

const DisplayPhoneNumber = ({
    phoneNumber
} : {
    phoneNumber?: number | null
}) => {


    return (
        <div className='flex my-2'>
            <div className='px-2'>
                <h2 className='text-[#555555cc] font-bold'>Phone Number</h2>
            </div>
            <div className='pl-4'>
                {
                    phoneNumber ? 
                    <h2 className='text-black font-semibold'>{phoneNumber}</h2> :
                    <h2 className='text-[#555555cc] font-semibold'>No Phone Number</h2>
                }
            </div>
        </div>
    )
}

export default DisplayPhoneNumber