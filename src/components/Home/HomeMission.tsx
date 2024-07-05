import Image from 'next/image'
import Ceo_Ecommerce from '../../../public/Ceo_Ecommerce_Example.png'

const HomeMission = () => {
  return (
    <div className='p-36 pt-20 bg-[#119bbe]'>
        <div className='mx-auto flex gap-4 justify-center items-center'>
            <div className='w-[500px]'>
                <h2 className='font-bold text-3xl mb-3 pl-4'>#Mission</h2>
                <p className='text-lg font-medium'>Our Companies Mission is to create an online Shopping application
                    and make a network of trusted delivery ditributor to have a fast deliver we 
                    aim to having just 1 day delivery after being ordered.
                    Our Mission is to give you the product as fast as possible without compromising 
                    the quality of the product
                </p>
            </div>  
            <div className='relative'>
                <div className='ml-20'>
                    <Image 
                    src={Ceo_Ecommerce} alt='' />
                    <div className='bg-[#023047] w-[360px] h-[230px] absolute
                    left-1 bottom-[-40px] rounded-xl p-7'>
                        <h2 className='font-semibold text-white text-xl mb-1'>Elon Reeve Musk</h2>
                        <p className='font-medium text-white mb-3'>Ceo of Ecommerce</p>
                        <p className='text-white'>"I will try my best to make this companies mission came to reality
                            and i will try to make delivery of online shoppings fast and safe"</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeMission