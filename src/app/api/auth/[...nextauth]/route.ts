import NextAuth, { AuthOptions, User } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

import bcrypt from 'bcrypt'
import removeNBigInt from '@/utils/removeNBigInt'

const prisma = new PrismaClient()

export const authoptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    scope: 'profile email openid'
                }
            }
        }), // GOOGLE AUTH WORKING!!!
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "renn44"},
                password: { label: "Password", type: "password"},
            },
            authorize: async (credentials, req): Promise<any> => {
                if(!credentials?.password || !credentials.username) return null
                const user = await prisma.user.findFirst({
                    where: {
                        name: credentials?.username
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        password: true,
                        business: true,
                        userInfo: true
                    }
                })

                // check if user exist and password exist(if not then it meant that it is an Oauth)
                if(!user || !user.password) return null
                const verifiedPassword = bcrypt.compareSync(credentials?.password, user.password)

                if(!verifiedPassword) return null
                return user 
            }
        })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user, profile, account })  {
            if(token.userInfo) return token

            if(user) {
                token.businessId = user.business?.id,
                token.userInfo = user.userInfo
            }

            if(account?.provider === 'google') {

                let userDb: any = await prisma.user.findFirst({
                    where: {
                        id: token.sub
                    },
                    select: {
                        business: true,
                        userInfo: true
                    }
                })

                if(userDb?.userInfo?.phoneNumber) {
                    userDb.userInfo.phoneNumber = removeNBigInt(userDb?.userInfo?.phoneNumber)
                }
                
                if(userDb) {
                    token.businessId = userDb.business?.id,
                    token.userInfo = userDb.userInfo || undefined
                }
            }
 
            return token 
        },
        async session({ token, session, user}) {
            // google AUth not accepting userInfo and businessId error
            
           if(token) {
                session.user.userInfo = token.userInfo || undefined // still has no userInfo
                session.user.businessId = token.businessId as string // token.business is and id of the business look at the next-auth.type
                session.user.id = token.sub as string // this is the id (token.sub)
           }

            return session
        },
    },
    // pages: {
    //     signIn: '/login',
    // }, // this for custom pages reference:https://next-auth.js.org/configuration/pages
}

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST }
