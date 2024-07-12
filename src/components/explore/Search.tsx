"use client"

import { useCallback, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Debouncer from '@/utils/Debouncer'
import { useRouter } from "next/navigation";

// !!!WARNING NAPAKA CONFUSING SO PAKI AYOS LATER

const Search = () => {
    const router = useRouter()
    const [search, setSearch] = useState<string>('')
    const [searchResult, setSearchResult] = useState([]) // make this an array of string or something later
    const useDebounce = Debouncer(search, 250)

    const handlefetchSearch = useCallback(async () => {
        if(!search) return
        try {
            const res: Response = await fetch(`api/search/${useDebounce}`, {
                method: 'GET',
                credentials: 'include'
            })

            const searchData = await res.json()
            if(searchData.error) throw new Error(searchData.error)

            if(!searchData) return

            setSearchResult(searchData)
        } catch (error) {
            console.log(error)
        }
    }, [useDebounce])

    useEffect(() => {
        // for auto correct
        handlefetchSearch()

        if(search === "") return setSearchResult([])
    }, [useDebounce])

    const handleCorrect = (info: { [key: string]: string; }) => {
        if(info.name === "None found") return
        setSearch(info.name)

        setSearchResult([])
        setSearch('')
        router.push(`explore?pag=1&search=${info.name}`) // use to search for auto correct cannot use handleSearch
    }

    const handleSearch = (e: any) => {
        e.preventDefault()
        if(!search) return 

        setSearch('')
        router.push(`/explore?page=1&search=${search}`)
    }

    return (
        <div className={`flex gap-2 bg-white p-1 
        ${searchResult.length > 0 ? 'rounded-t-lg' : 'rounded-lg'}` }>
            <form 
            onSubmit={handleSearch}
            className="h-full relative">
                <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="h-[35px] w-[400px] px-1 text-lg outline-none"
                type="text" 
                />
                <div className="absolute w-[449px] bg-white left-[-4px] rounded-b-lg">
                    {searchResult?.map((info: { [key: string]: string }) => {
                        return (
                            <h2 
                            key={info.name}
                            onClick={() => handleCorrect(info)}
                            className="px-1 cursor-pointer text-lg ">
                                {info.name}
                            </h2>
                        )
                    })}
                </div>
            </form>
            <div className="p-1 cursor-pointer">
                <FaMagnifyingGlass 
                onClick={(e) => handleSearch(e)}
                size={25} />
            </div>
        </div>
    )
}

export default Search