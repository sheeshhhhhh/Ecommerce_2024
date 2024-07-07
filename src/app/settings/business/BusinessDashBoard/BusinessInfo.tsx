"use client"

import Input from "@/components/Input"
import { updateBusinessinfo } from "./BusinessUpdate.action"
import { useEffect, useState } from "react"

type businessInfoType = {
  description: string,
  category: string,
  contactNumber: string,
  email: string,
  id: string
}

const BusinessInfo = ({
  description,
  category,
  contactNumber,
  email,
  id
} : businessInfoType) => {
  const [info, setInfo] = useState<businessInfoType>({
    description: description || "",
    category: category || "",
    contactNumber: contactNumber,
    email: email || "",
    id: id // id is not needed but its on the type so i put it
  })
  const [changed, setChanged] = useState<boolean>(false)
  const updatebusinessInfo = updateBusinessinfo.bind(null, id)

  useEffect(() => {
    if(description !== info.description) return setChanged(true)
    if(category !== info.category) return setChanged(true)
    if(contactNumber !== info.contactNumber) return setChanged(true)
    if(email !== info.email) return setChanged(true)
      
    setChanged(false)
  }, [info, description, category, contactNumber, email])

  return (
    <div>
      <form action={updatebusinessInfo}>
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
        {changed && <button type='submit'>save</button>}
      </form>
    </div>
  )
}

export default BusinessInfo