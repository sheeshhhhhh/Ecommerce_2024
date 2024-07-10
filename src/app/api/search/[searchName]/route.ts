import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest, 
    { params } : { params: { searchName: string} }
) {
    const searchName = params.searchName

    const searchResultCorrect = await prisma.item.findMany({
        select: {
            name: true
        }, 
        where: {
            name: {
                contains: searchName,
                mode: 'insensitive'
            }
        },
        take: 10,
        
    })

    if(searchResultCorrect.length === 0) {
        return NextResponse.json([{name: "None found"}]);
    }

    return NextResponse.json(searchResultCorrect)
}