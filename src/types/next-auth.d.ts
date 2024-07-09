import type { Business, UserInfo } from "@prisma/client";
import { User } from "next-auth";
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        id: string,
        business?: string,
        userInfo?: UserInfo
    }
}

declare module 'next-auth' {
    interface User {
        business?: Business,
        userInfo?: UserInfo
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            businessId?: string,
            userInfo?: UserInfo
        }
    }
}
