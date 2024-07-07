"use client"
import { usePathname, useRouter } from "next/navigation"

const page = () => {
  // just redirect him to the editProfile

  if(usePathname() === '/settings') return useRouter().push('/settings/editProfile')

  return (
    <div>
      Waiting to redirect...
    </div>
  )
}

export default page