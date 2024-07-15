"use client"

import { useState } from "react"
import ChangePasswordModal from "./ChangePasswordModal"

export type ChangePasswordButtonwithModalProps = {
    id: string
}

const ChangePasswordButtonwithModal = ({
    id
} : ChangePasswordButtonwithModalProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return (
        <div className="mt-2">
            <button
            className="p-2 bg-[#555555cc] font-medium rounded-md shadow-md hover:text-white transition-all duration-300"
            onClick={() => setModalOpen(true)}
            >
                Change Password
            </button>
            {
            modalOpen && 
            <ChangePasswordModal 
            setModalOpen={setModalOpen}
            id={id} 
            />
            }
        </div>
    )
}


export default ChangePasswordButtonwithModal