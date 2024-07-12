import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { orderquantity, item_id, price} = body
    
    if(!orderquantity || !item_id || !price) return NextResponse.json({ error: "please fill in the fields"})

    const totalPrice = price * orderquantity
    
}