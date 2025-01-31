import { db } from "@/prisma/db";
import { ProductType } from "@/Types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const {id} = await params
        const getSingleProduct = await db.product.findUnique({
            where : {
                id : id
            }
        })
        return NextResponse.json({
            message: "product created",
            data: getSingleProduct
        })
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const {id} = await params
        const deletedProduct = await db.product.delete({
            where : {
                id : id
            }
        })
        return NextResponse.json({
            message : "product deleted successfully",
            data: deletedProduct,
            error: null
        }) 
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message : "product deleted successfully",
            data: null,
            error: "something went wrong"
        }) 
    }
}

export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const {id} = await params
        const newData:ProductType = await request.json()
        const updateProduct = await db.product.update({
            where: {
                id : id
            },
            data:newData
        })
        return NextResponse.json({
            message: "product updated succesfully",
            data: updateProduct,
            error: null
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "product updated succesfully",
            data: null,
            error: "something went wrong"
        })
    }
}