import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { generateToken } from "@/app/utils/jwt";
const prisma =new PrismaClient()
export  async function POST(req:NextRequest){
   try {
    const { email, password}= await req.json()
    
    if(!email||!password){
     return NextResponse.json({message:"plaese enter valid"},{status:400})
    }
    const user = await prisma.user.findUnique({where:{email},select:{
        id:true,
        name:true,
        email:true,
        password:true,
        role:true
    }})
    if(!user){
        return NextResponse.json({message:"invalid credentials"},{status:400})
    }

    if(!user|| !(await bcrypt.compare(password,user.password))){
        return NextResponse.json({message:"invalid credentials"},{status:400})
    }
    const token = generateToken({
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    })

    return NextResponse.json({user},{status:200})
   } catch (error) {
    return NextResponse.json({message:"internal server error "})
   }
}