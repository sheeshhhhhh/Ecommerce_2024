import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ChangePasswordButtonwithModal from "./ChangePasswordButtonwithModal"


const page = async () => {
  const session = await getServerSession(authoptions)

  if(!session?.user?.id) return redirect('/api/auth/signin')

  return (
    <div>
      <div className='my-4 pl-14'>
        <h2 className='text-2xl font-bold'>Password</h2>
      </div>
      <div className='py-16 px-10'>
        <div className='w-[600px]'>
          <div className="flex flex-col">
            <h2 className="font-bold text-lg ml-1 mb-1">Change Password</h2>
            <p className="text-xs w-[300px]">
              Changing your password is good espescially if someone knew about it we 
              also recommend using a strong password
            </p>
            <ChangePasswordButtonwithModal id={session?.user?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page