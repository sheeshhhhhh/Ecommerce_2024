import Input from "@/components/Input"
import LogoInput from "./LogoInput"
import CreateBusiness from "./CreateBusiness.action"

import { getServerSession } from "next-auth"
import { authoptions } from "@/app/api/auth/[...nextauth]/route"


const CreateBusinessForm = async () => {
    const session = await getServerSession(authoptions)

    if(!session) return
    const handleCreateBusiness = CreateBusiness.bind(null, session?.user?.id)

    return (
        <div className="w-full min-h-[400px] bg-white p-4 rounded-md">
            <form
            className="relative rounded-2xl" 
            action={handleCreateBusiness}>
                <div className="max-w-[350px]">
                    <div>
                        <Input name="businessName" label="Business Name"  />
                    </div>
                    <div>
                        <Input name="description" label="description" />
                    </div>
                    <div>
                        <Input name="category" label="Category" />
                    </div>
                    <div>
                        <Input name="ContactNumber" label="Contact Number" />
                    </div>
                    <div>
                        <Input name="Email" label="Email from Notification(Optional)"/>
                    </div>
                </div>
                <LogoInput />
                <button type="submit">Create Business</button>
            </form>
        </div>
    )
}

export default CreateBusinessForm