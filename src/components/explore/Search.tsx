"use client"

import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Debouncer from '@/utils/Debouncer'

const Search = () => {
    const [search, setSearch] = useState<string>('')
    const [searchResult, setSearchResult] = useState([]) // make this an array of string or something later
    const useDebounce = Debouncer(search, 500)

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const res: Response = await fetch(`api/search/${useDebounce}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                const searchData = await res.json()

                if(searchData.error) throw new Error(searchData.error)
                console.log(searchData)
                setSearchResult(searchData.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleSearch()
    }, [useDebounce])

    return (
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg">
            <div>
                <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="h-[35px] w-[400px] px-1 text-lg outline-none"
                type="text" 
                />
            </div>
            <div className="p-1 cursor-pointer">
                <FaMagnifyingGlass size={25} />
            </div>
            {searchResult.map((info) => {
                return <h2>{info}</h2>
            })}
        </div>
    )
}

export default Search