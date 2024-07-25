import { authoptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ChangePasswordButtonwithModal from "./ChangePasswordButtonwithModal"
import AccountRemovalButtonwithModals from "./AccountRemovalButtonwithModals"
import MultifactorButtonwithModal from "./MultifactorButtonwithModal"


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
          <div className="flex flex-col mb-3">
            <h2 className="font-bold text-lg ml-1 mb-1">Change Password</h2>
            <p className="text-xs w-[300px]">
              Changing your password is good espescially if someone knew about it we 
              also recommend using a strong password
            </p>
            <ChangePasswordButtonwithModal id={session?.user?.id} />
          </div>
          <div className="flex flex-col mb-3">
            <h2 className="font-bold text-lg ml-1 mb-1">Multifactor Authentication</h2>
            <p className="text-xs w-[400px]">
              Having multifactor authentication is making sure that even if your password
              get stolen you would still be able to log in.
              <span className="text-red-600">
                Warning: You can't have multifactor authentication if you don't have 
                email save in this account
              </span>
            </p>
            <MultifactorButtonwithModal id={session?.user?.id} />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-lg ml-1 mb-1">Account Removal</h2>
            <p className="text-xs w-[300px] mb-2">
              Deactivating your account means you can recover it at any time after taking this action
            </p>
            <AccountRemovalButtonwithModals id={session?.user?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page