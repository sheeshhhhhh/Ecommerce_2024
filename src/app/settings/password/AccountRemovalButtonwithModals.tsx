"use client"

import { useState } from "react"
import DeactivateModal from "./DeactivateModal"

type AccountRemovalButtonwithModalsProps = {
    id: string
}

const AccountRemovalButtonwithModals = ({
    id
} : AccountRemovalButtonwithModalsProps) => {
    const [deactivateModalOpen, setDeactivateModalOpen] = useState<boolean>(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

    return (
        <div className="flex gap-4">
            <button
            onClick={() => setDeactivateModalOpen(true)}
            className="p-2 bg-[#555555cc] text-sm font-medium rounded-md shadow-md hover:text-white 
            transition-color duration-300"
            >
                Deactivate Account
            </button>
            <button
            onClick={() => setDeleteModalOpen(true)}
            className="p-2 border-[2px] border-[#555555cc] text-sm font-medium rounded-md shadow-md
            hover:bg-[#555555cc] transition-[background] duration-300"
            >
                Delete Account
            </button>
            {deactivateModalOpen && <DeactivateModal id={id} setDeactivateModalOpen={setDeactivateModalOpen} />}
        </div>
    )
}

export default AccountRemovalButtonwithModals