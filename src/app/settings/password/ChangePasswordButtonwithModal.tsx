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
        <div>
            <button
            onClick={() => setModalOpen(true)}
            >
                Change Password
            </button>
            {
            modalOpen && 
            <ChangePasswordModal 
            id={id} 
            />
            }
        </div>
    )
}


export default ChangePasswordButtonwithModal