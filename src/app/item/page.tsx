
import { ViewItem } from "@/app/explore/Actions"

import NoItem from "./NoItem"
import BusinessInfo from "./BusinessInfo"


const page = async ({
  searchParams
} : {
  searchParams: {
    item_id: string | undefined
  }
}) => {
  const item = await ViewItem(searchParams.item_id || '')

  if(!item) return <NoItem />

  return (
    <div className="h-full w-[1200px] mx-auto">
      <div>
        <BusinessInfo business={item.business} />
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default page