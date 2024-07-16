import { PropsWithChildren } from "react"


const SubmitButton = ({ children } : PropsWithChildren) => {

    return (
        <button 
        className="w-[250px] bg-[#555555cc] p-2 rounded-lg shadow-md font-bold
        hover:text-white transition-color duration-300"
        type="submit"
        >
            {children}
        </button>
    )
}

export default SubmitButton