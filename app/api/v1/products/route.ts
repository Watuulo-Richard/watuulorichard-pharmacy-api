/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/prisma/db";
import { ProductType } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const data:ProductType = await request.json()
        const createProduct = await db.product.create({
            data
        })

    return NextResponse.json({
        message:"product created successfully",
        data: createProduct,
        error:null,
    },{
        status: 200
    })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
        message:"product created successfully",
        data: null,
        error:"something went wrong"
    },{
        status: 500
    })
    }
}

export async function GET(request:NextRequest){
    try {
        // const data:ProductType = await request.json()
        const getAllProducts = await db.product.findMany()
        return NextResponse.json({
            message: "product created successfully",
            data:getAllProducts,
            error:null
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"failed to create product",
            data: null,
            error:"something went wrong"
        },{
            status: 500
        })
    }
}