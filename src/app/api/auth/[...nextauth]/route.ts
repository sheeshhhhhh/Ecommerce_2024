import NextAuth, { AuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const authoptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                    scope: 'profile email openid'
                }
            }
        }
        ), // GOOGLE AUTH WORKING!!!
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
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {

            if(account?.provider === 'google') {
                // getting the user in the data base update the user that will be use by token
                const userDb = await prisma.user.findUnique({
                    where: {
                        id: user.id
                    },
                    select: {
                        business: true,
                        userInfo: true
                    }
                })
                // still not fixed fix later
                if(!userDb) {
                    // if user has just been created then there is no need for it to have a business
                    const createUser = await prisma.user.create({
                        data: {
                            name: user.name,
                            image: user.image,
                            email: user.email as string || ''
                        }
                    })
                    

                    const createUserInfo = await prisma.userInfo.create({
                        data: {
                            userId: createUser.id
                        }
                    })

                    console.log(createUserInfo)
                    if(!createUserInfo) throw new Error("Failed to create userInfo")

                    user.userInfo = createUserInfo
                } else if(userDb) {
                    // if userdb already exist
                    if(user?.business) {
                        // might need business id
                        user.business.id = userDb?.business?.id as string
                    }
    
                    if(!user.userInfo || user.userInfo === null) {
                        // responsible for creating userinfo which is needed by thr user
                        // because all the information will be stored in there
                        const findUserInfo = await prisma.userInfo.findUnique({
                            where: {
                                userId: user.id
                            }
                        })

                        if(findUserInfo) {
                            user.userInfo = userDb?.userInfo || undefined
                        } else {
                            const createUserInfo = await prisma.userInfo.create({
                                data: {
                                    userId: user.id
                                }
                            })
                            
                            if(!createUserInfo) throw new Error("Failed to create userInfo")
        
                            user.userInfo = createUserInfo
                        }
                    }
                }
            }

            return true
        },
        async session({ token, session, user}) {
            // google AUth not accepting userInfo and businessId error

            session.user.userInfo = token.userInfo || undefined // still has no userInfo
            session.user.businessId = token.businessId as string // token.business is and id of the business look at the next-auth.type
            session.user.id = token.sub as string // this is the id (token.sub)

            return session
        },
        async jwt({ token, user })  {
            
            if(user) {
                token.businessId = user.business?.id,
                token.userInfo = user.userInfo
            }

            return token
        }
    },
    // pages: {
    //     signIn: '/login',
    // }, // this for custom pages reference:https://next-auth.js.org/configuration/pages
}

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };