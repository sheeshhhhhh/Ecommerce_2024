import CartsModal from '@/components/explore/CartsModal'
import Search from '@/components/explore/Search'
import NavBar from '@/components/NavBar'

const page = () => {


    return (
        <div className='min-h-screen'>
            <NavBar />
            <div className='px-[400px] flex gap-4 justify-center items-center'>
                <Search />
                <CartsModal size={30} />
            </div>
        </div>
    )
}

export default page