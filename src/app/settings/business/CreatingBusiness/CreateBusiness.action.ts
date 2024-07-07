"use server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const CreateBusiness = async (userId: string , formData: FormData) => {

    const BusinessName = formData.get('businessName') as string 
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const contactNumber = formData.get('ContactNumber') as string
    const email = formData.get('Email') as string
    const LogoUrl = formData.get('Logo') as string
    const CoverPhotoUrl = formData.get('CoverPhoto') as string

    if(!userId || !BusinessName || !contactNumber || !LogoUrl) return 
    
    const prismaCreateBusiness = await prisma.business.create({
        data: {
            businessName: BusinessName,
            ownerId: userId,
            description: description,
            contactNumber: contactNumber,
            category: category,
            email: email,
            logoUrl: LogoUrl,
            CoverPhotoUrl: CoverPhotoUrl
        }
    })

    //revalidate path to the user business
    return prismaCreateBusiness
}

export default CreateBusiness