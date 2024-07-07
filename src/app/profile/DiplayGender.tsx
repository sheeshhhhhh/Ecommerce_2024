import { Gender } from '@prisma/client'
import React from 'react'

const DiplayGender = ({
    gender
} : {
    gender?: Gender | null
}) => {

    const preselectedGender = ["Male", "Female", "Others"]

    return (
        <div className='flex my-2'>
            <div className='px-2'>
                <h2 className='text-[#555555cc] font-bold'>Gender</h2>
            </div>
            <div className='pl-4 flex'>
                {preselectedGender.map((genderInfo, idx) => {
                    const selected = gender === genderInfo
                    return (
                        <div key={idx} className='flex mr-3 items-center'>
                            <div className={`mr-2 rounded-full border-[2px] border-[#555555cc] size-5
                            ${selected && 'border-black'} flex justify-center items-center`}>
                                { selected && <div className='size-2 rounded-full bg-black'></div> }
                            </div>
                            <span>{genderInfo}</span>
                        </div>
                    )
                    })
                }
            </div>
        </div>
    )
}

export default DiplayGender