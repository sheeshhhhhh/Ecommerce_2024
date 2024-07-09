"use client"

import Input from "@/components/Input"
import { updateBusinessinfo } from "./BusinessUpdate.action"
import { useEffect, useState } from "react"
import SaveButton from "./SaveButton"

type businessInfoType = {
  description: string | null,
  category: string | null,
  contactNumber: string,
  email: string | null,
  id: string
}

const BusinessInfo = ({
  description,
  category,
  contactNumber,
  email,
  id
} : businessInfoType) => {
  const [info, setInfo] = useState<any>({
    description: description || "",
    category: category || "",
    contactNumber: contactNumber,
    email: email || "",
  })
  const [changed, setChanged] = useState<boolean>(false)
  const updatebusinessInfo = updateBusinessinfo.bind(null, id)

  const resetFunction = () => {
    setInfo({
      description: description || "",
      category: category || "",
      contactNumber: contactNumber,
      email: email || "",
    })
  }

  useEffect(() => {
    if(description !== info.description) return setChanged(true)
    if(category !== info.category) return setChanged(true)
    if(contactNumber !== info.contactNumber) return setChanged(true)
    if(email !== info.email) return setChanged(true)
      
    setChanged(false)
  }, [info, description, category, contactNumber, email])

  return (
    <div>
      <form action={updatebusinessInfo} >
        <div>
          <div>
            <Input 
            label="Email"
            name="email"
            type="text"
            onChange={(e) => setInfo({ ...info, email:e.target.value})}
            value={info.email}
            />
          </div>
          <div>
            {/* possible to put in the side and make a content editable div */}
            <Input 
            label="Description"
            name="description"
            type="text"
            onChange={(e) => setInfo({ ...info, description:e.target.value})}
            value={info.description}
            />
          </div>
          <div>
            <Input 
            label="Category"
            name="category"
            type="text"
            onChange={(e) => setInfo({ ...info, category:e.target.value})}
            value={info.category}
            />
          </div>
          <div>
            <Input 
            label="Contact Number"
            name="contactNumber"
            type="text"
            onChange={(e) => setInfo({ ...info, contactNumber:e.target.value})}
            value={info.contactNumber}
            />
          </div>
        </div>
        <SaveButton resetFunction={resetFunction} changed={changed} />
      </form>
    </div>
  )
}

export default BusinessInfo