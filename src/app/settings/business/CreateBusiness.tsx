import React from 'react'
import CreateBusinessForm from './CreatingBusiness/CreateBusinessForm'

const CreateBusiness = () => {
  return (
    <div>
        <h2 className='font-bold text-xl'>Create Business</h2>
        <ul className='my-2 list-disc list-inside'>
            <li className='text-lg'>Want to earn money?</li>
            <li className='text-lg'>Want to Control your own time?</li>
            <li className='text-lg'>Want to make an impact?</li>
            <li className='text-lg'>Want to be a business person</li>
        </ul>
        <p className='my-4 indent-4 text-lg'>
            If your the kind of person who want's to earn money and be a business person
            its good to start on an online business because of time saving and control over 
            your time. Our company promote people like you.
        </p>
        <div>
            <h2 className='mb-3 text-lg font-bold'>Business Form</h2>
            <CreateBusinessForm />
        </div>
    </div>
  )
}

export default CreateBusiness