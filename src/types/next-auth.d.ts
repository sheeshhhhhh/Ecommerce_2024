import type { Business, UserInfo } from "@prisma/client";
import "next-auth";
import 'next-auth/jwt';


interface ExtendedUser extends DefaultUser {
    business?: Business,
    userInfo?: userInfo
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string,
        business?: string,
        userInfo?: UserInfo
    }
}

declare module 'next-auth' {
    interface User extends ExtendedUser {}
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            businessId?: string,
            userInfo?: UserInfo
        }
    }
}
