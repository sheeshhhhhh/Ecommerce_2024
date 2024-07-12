"use client"

import Link from "next/link"


const NoItem = () => {

    const handleGoBack = () => {
        window.history.back()
    }

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-2 items-start">
            <h2 className="text-[40px] font-bold">Item is not Found</h2>
            <div className="flex gap-2 items-center">
                <p className="text-2xl font-semibold">Error 404</p>
                <Link 
                className="text-xl font-medium text-blue-700 
                hover:underline hover:underline-offset-2"
                href={'/explore?page=1'}>
                    Go explore page
                </Link>
            </div>
            <button
            className="text-lg font-medium text-blue-700 
            hover:underline hover:underline-offset-2"
            onClick={handleGoBack}
            >
                Go Back
            </button>
        </div>
    </div>
  )
}

export default NoItem