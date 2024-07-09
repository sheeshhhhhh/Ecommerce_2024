import { Business } from '@prisma/client'
import React from 'react'
import BusinessInfo from './BusinessDashBoard/BusinessInfo'
import ChangeLogo from './BusinessDashBoard/ChangeLogo'



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