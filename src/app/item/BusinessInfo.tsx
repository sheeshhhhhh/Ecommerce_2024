import { formatTime } from "@/utils/formatDate"
import { Business } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"


type BusinessInfoProps = {
    business: Business
}

const BusinessInfo = ({
    business
}: BusinessInfoProps) => {

    const createdAt =  formatTime(business.createdAt)

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
                    <div className="grid grid-cols-3 grid-rows-2 justify-between pl-[25px] gap-y-[20px] gap-x-[50px] 
                    grid-flow-row">
                        <div className="flex justify-between w-full">
                            <label className="mr-3 text-[#555555cc]">Ratings</label>
                            <span>16.7K</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <label className="mr-3 text-[#555555cc]">Response Rate</label>
                            <span>61%</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <label className="mr-3 text-[#555555cc]">Joined </label>
                            <span>{createdAt}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <label className="mr-3 text-[#555555cc]">Products</label>
                            <span>143</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <label className="mr-3 text-[#555555cc]">Response Time</label>
                            <span>within hours</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <label className="mr-3 text-[#555555cc]">Follower</label>
                            <span>14.1K</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BusinessInfo