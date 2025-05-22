import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"


interface userDate{
    id:number
    name:string
    email:string,
    role:'user'|'admin'|'superAdmin'
}

const jwtAuthConfig={
    secret:process.env.JWT_SECRET||'Test@',
    jwtExpiration:'1h'

}
export const generateToken=async(user:userDate)=>{
    const payload ={
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    return jwt.sign(payload,jwtAuthConfig.secret)
}

export const ValidateToken= (req:NextRequest):userDate =>{
    const token= req.headers.get('authorization')?.split(' ')[1]!
     if(!token){
      throw new Error("token not found");
      
     }
    let doceded :any
    try {
  
      doceded= jwt.verify(token,jwtAuthConfig.secret)
      if(!doceded.id|| !doceded.name||!doceded.email||!doceded.role){
        throw new Error("token payloads not found ");
      }
    } catch (error) {
      throw new Error("invalid token");
    }
    return {
      id: doceded.id,
      name:doceded.name,
      email:doceded.email,
      role:doceded.role
  
     }
  }