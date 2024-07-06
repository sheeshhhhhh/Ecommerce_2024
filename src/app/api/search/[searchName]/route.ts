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
            name: searchName
        },
        take: 10
    })

    return NextResponse.json(["Hello", "bruh"], { status: 200 })
}