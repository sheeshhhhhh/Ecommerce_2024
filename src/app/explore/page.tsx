import CartsModal from '@/components/explore/CartsModal'
import Search from '@/components/explore/Search'
import NavBar from '@/components/NavBar'
import { getServerSession } from 'next-auth'
import { authoptions } from '../api/auth/[...nextauth]/route'

const page = async () => {
    const user = await getServerSession(authoptions)

    return (
        <div className='min-h-screen'>
            <NavBar userInfo={user?.user} />
            <div className='px-[400px] flex gap-4 justify-center items-center'>
                <Search />
                <CartsModal size={30} />
            </div>
        </div>
    )
}

export default page