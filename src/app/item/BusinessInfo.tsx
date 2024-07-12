import { Business } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"


type BusinessInfoProps = {
    business: Business
}

const BusinessInfo = ({
    business
}: BusinessInfoProps) => {

  return (
    <div className="h-full p-[25px] bg-white mt-[15px]">
        <div className="p-[10px] flex">
            <section className="border-r-[2px] ">
                <div className="flex pr-[25px]">
                    <Link 
                    className="mr-5"
                    href={`explore/business/${business.id}`} >
                        <Image
                        className="size-[78px] rounded-full"
                        width={78}
                        height={78} 
                        src={business.logoUrl}
                        alt=""
                        />
                    </Link>
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">
                            {business.businessName}
                        </h3>
                        {/* put status | online or offline */}
                        {/* Put Add Cart or View Shop */}
                    </div>
                </div>
            </section>
            <section>
                <div></div>
            </section>
        </div>
    </div>
  )
}

export default BusinessInfo