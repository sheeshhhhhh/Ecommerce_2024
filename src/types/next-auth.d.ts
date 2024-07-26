import type { Business, Cart, CartItem, Item, UserInfo } from "@prisma/client";
import "next-auth";
import 'next-auth/jwt';

// for next auth
interface ExtendedUser extends DefaultUser {
    business?: Business,
    userInfo?: userInfo,
    multifactor: boolean | null,
    totpSecret: string | null
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
            userInfo?: UserInfo,

        }
    }
}


export type CartitemData = {
    quantity: number,
    cartId: string,
    item: Item,
    id: string
}

export interface Cartitem {
    id: string,
    createdAt: Date,
    cartItem: CartitemData[]
}

export type AuthProviderResponse = {
    accounts: {
        provider: string;
    }[];
} | {
    error: string;
};
