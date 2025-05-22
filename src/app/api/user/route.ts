import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { generateToken } from "@/app/utils/jwt";
const prisma =new PrismaClient()
export async function POST(req:NextRequest){
try {
    const {email ,name ,password}= await req.json()
    if(!email||!name||!password){
        return NextResponse.json({message:"please enter valid"},{status:400})
    }
    const checkemail= await prisma.user.findFirst({where:{email}})
    if(checkemail){
        return NextResponse.json({message:"this email is already taken"},{status:400})
    }
    const Hashed=  await  bcrypt.hash(password,10)
    const newUser=  await prisma.user.create({data:{
        email,
        password:Hashed,
        name

    }})
    
  return NextResponse.json({newUser,massage:"user registered"},{status:201})
} catch (error) {
    
}
}