"use client"

import { Session } from 'next-auth'
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

type ProviderSessionType = {
    session?: Session
} & PropsWithChildren

const ProviderSession = ({ 
    children, 
    session 
}: ProviderSessionType) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default ProviderSession