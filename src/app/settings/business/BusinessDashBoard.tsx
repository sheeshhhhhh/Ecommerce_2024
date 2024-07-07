import { Business } from '@prisma/client'
import React from 'react'
import BusinessInfo from './BusinessDashBoard/BusinessInfo'



const BusinessDashBoard = ({
    business
} : {
    business: Business
}) => {
  return (
    <div>
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