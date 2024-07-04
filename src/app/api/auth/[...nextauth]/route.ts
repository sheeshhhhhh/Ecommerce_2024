import NextAuth, { AuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const authoptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }), // GOOGLE AUTH WORKING!!!
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "renn44"},
                password: { label: "Password", type: "password"},
            },
            authorize: async (credentials, req) => {
                console.log(credentials)
                if(!credentials?.password || !credentials.username) return null
                const user = await prisma.user.findFirst({
                    where: {
                        name: credentials?.username
                    }
                })
                // check if user exist and password exist(if not then it meant that it is an Oauth)
                if(!user || !user.password) return null

                const verifiedPassword = bcrypt.compareSync(credentials?.password, user.password)

                if(!verifiedPassword) return null

                return user // giving the user
            }
        })
    ],
    session: {
        strategy: "jwt",
    }, // add secret later
    callbacks: {

    },
    // pages: {
    //     signIn: '/login',
    // }, // this for custom pages reference:https://next-auth.js.org/configuration/pages
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };