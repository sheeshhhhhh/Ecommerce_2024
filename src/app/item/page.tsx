
import { ViewItem } from "@/app/explore/Actions"

import NoItem from "./NoItem"
import BusinessInfo from "./BusinessInfo"
import ItemInfo from "./ItemInfo"


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
        <ItemInfo
          item_id={item.item_id}
          Photo={item.Photo}
          name={item.name}
          category={item.category}
          description={item.description}
          price={item.price}
          quantity={item.quantity}
          createAt={item.createAt}
        />
      </div>
    </div>
  )
}

export default page