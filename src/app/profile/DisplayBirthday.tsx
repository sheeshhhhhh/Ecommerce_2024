import { getMonth } from '@/utils/getMonthString'
import React from 'react'

const DisplayBirthday = ({
    birthday="2004-03-24"
} : {
    birthday?: string | null
}) => { 
    if (!birthday) return

    const split = birthday?.split('-', 3) 

    const day = split[2]
    const month = getMonth(split[1])
    const year = split[0]

    return (
        <div className='flex my-2'>
            <div className='px-2'>
                <h2 className='text-[#555555cc] font-bold'>
                    Date of birth {" "}
                    <span className='text-black font-medium'>(optional)</span>
                </h2>
            </div>
            <div className='pl-4 flex gap-2'>
                <h2 className='px-1 font-semibold'>{month}</h2>
                <h2 className='px-1 font-semibold'>{day}</h2>
                <h2 className='px-1 font-semibold'>{year}</h2>
            </div>
        </div>
    )
}

export default DisplayBirthday