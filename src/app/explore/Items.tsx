import Link from 'next/link'

import { getItems } from './Actions'
import ItemCard from './ItemCard'

const Items = async ({
  search,
  page = 1
} : {
  search?: string,
  page?: number
}) => {

  const items = await getItems(page, search)

  if(!items) return 

  return (
    <div className='sm:w-[300px] md:w-[800px] lg:w-[1300px] mx-auto p-4'>
        {search && <h2 className='ml-4 mb-1'>Search for <span className='font-medium'>{search}</span></h2>}
        <div className='grid sm:grid-cols-2 grid-cols-3 lg:grid-cols-5 grid-rows-5 border-t-[1px] border-[#555555cc] 
         pt-3 justify-items-center'>
          {items.map((item) => {
            return (
              <Link 
              href={`/item/${item.item_id}`}
              key={item.item_id}>
                 <ItemCard item={item} />
              </Link>
            )
          })}
        </div>
    </div>
  )
}

export default Items