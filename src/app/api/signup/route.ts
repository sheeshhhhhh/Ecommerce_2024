import bcrypt from 'bcrypt'
import { PrismaClient  } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { username, password, confirmPassword } = body
    if(!username || !password || !confirmPassword) return new NextResponse("Please fill in all the fields", { status: 400 })
    
    if(password !== confirmPassword) return new NextResponse("Password not the same", { status: 400 })

    const hashPassword = bcrypt.hashSync(password, 10)
    // create a user in prisma transactionn
    const userCreate:any = await prisma.$transaction(async (txprisma) => {

        const createUser = await txprisma.user.create({
            data: {
                name: username,
                email: username,
                password: hashPassword
            }
        })
    
        const createUserInfo = await txprisma.userInfo.create({
            data: {
                userId: createUser.id,
            }
        })
        
        return createUser
    })

    return NextResponse.json(userCreate)
}