import { Business } from '@prisma/client'
import React from 'react'
import BusinessInfo from './BusinessDashBoard/BusinessInfo'
import ChangeLogo from './BusinessDashBoard/ChangeLogo'
import Link from 'next/link'



const BusinessDashBoard = ({
    business
} : {
    business: Business
}) => {
  
  return (
    <div>
        <div className='p-2 mb-2 flex'>
          <div>
            <ChangeLogo Url={business.logoUrl} />
          </div>
          <div className='h-[200px] pt-10'>
            <h2 className='font-bold text-3xl'>{business.businessName}</h2>
            {/* put followers and ratings and review and category and description */}
          </div>
        </div>
        <div>
          <p>
            Do you want to see other infomation in your business? {" "}
            <Link
            className='text-blue-700 hover:underline hover:underline-offset-2 font-medium'
            href={'/business'}>
              View Business
            </Link>
          </p>
        </div>
        <BusinessInfo
        id={business.id}
        description={business.description}
        category={business.category}
        contactNumber={business.contactNumber}
        email={business.email}
        />
    </div>
  )
}

export default BusinessDashBoard