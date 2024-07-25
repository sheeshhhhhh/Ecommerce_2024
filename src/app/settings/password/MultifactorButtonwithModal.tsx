"use client"

import { useState } from "react"
import MultiFactorModal from "./MultiFactorModal"

type MultifactorButtonwithModalProps = {
    id: string
}

const MultifactorButtonwithModal = ({
    id
} : MultifactorButtonwithModalProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return (
        <div className="mt-2">
            <button
            className="p-2 bg-[#555555cc] font-medium rounded-md shadow-md hover:text-white transition-all duration-300"
            onClick={() => setModalOpen(true)}
            >
                Multi Factor Authentication
            </button>
            {
            modalOpen && 
            <MultiFactorModal 
            setModalOpen={setModalOpen}
            id={id} 
            />
            }
        </div>
    )
}

export default MultifactorButtonwithModal