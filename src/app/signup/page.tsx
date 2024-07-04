import Input from '@/components/Input'

const page = () => {
  return (
    <div className='h-screen w-full bg-clear-background
    flex justify-center items-center'>
        <form className='bg-white p-6 px-8 rounded-xl'>
            <div className='pl-2'>
                <h2 className='uppercase font-bold text-2xl'>Sign Up</h2>
            </div>
            <div className='flex flex-col gap-2 my-2'>
                <div aria-label='Username'>
                    <Input 
                    name='Username' 
                    label='Username' />
                </div>
                <div aria-label='Password'>
                    <Input 
                    name='Password' 
                    label='Password'/>
                </div>
                <div aria-label='Confirm Password'>
                    <Input 
                    name='confirmPassword' 
                    label='Confirm Password'
                    />
                </div>
            </div>
            <div>
                <button 
                className='px-4 py-3 border-[2px] border-[#aaa] rounded-lg hover:bg-[hsla(0,0%,93%,.8)] 
                transition-all w-full'
                type="submit"
                >Sign Up
                </button>
            </div>
        </form>
    </div>
  )
}

export default page