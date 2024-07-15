import Image from "next/image"

const NoProfile = ({
    error
} : { error : string }) => {
    console.log(error)

  return (
    <div className="w-full h-full flex-col justify-center items-center">
        <div>
            <h2 className='font-bold text-3xl' >Error 404</h2>
            <p className="text-lg font-medium">Message: {error}</p>
        </div>
        <div>
            {/* <Image
            className="w-[200px] h-[200px]"
            height={200}
            width={200} 
            alt=""
            src={'HTTP:???WHAT DA HELLLLL!!!'}
            /> */}
        </div>
    </div>
  )
}

export default NoProfile