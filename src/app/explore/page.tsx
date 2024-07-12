import CartsModal from '@/components/explore/CartsModal'
import Search from '@/components/explore/Search'
import NavBar from '@/components/NavBar'
import Items from './Items'

import { getServerSession } from 'next-auth'
import { authoptions } from '../api/auth/[...nextauth]/route'
import Explore from '@/components/Explore'

const page = async ({
    searchParams
} : {
    searchParams: { 
        search: string | undefined,
        page: number | undefined
    }
}) => {
    const user = await getServerSession(authoptions)

    return (
        <div className='min-h-screen'>
            <NavBar userInfo={user?.user} />
            <div className='px-[400px] flex justify-between'>
                <div className=''>
                    <Explore />
                </div>
                <div className='flex items-center gap-4'>
                    <Search />
                    <CartsModal size={30} />
                </div>
            </div>
            <div className='w-full'>
                <Items search={searchParams.search} page={searchParams.page} />
            </div>
        </div>
    )
}

export default page