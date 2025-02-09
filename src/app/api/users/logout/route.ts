import  jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token= req.cookies.get("token")?.value;
    if(!token){
        return NextResponse.json({message:"user is not authenticated",status:401})
    }
    try{
    const decodedToken=  jwt.verify(token,process.env.JWT_SECRET!)
    if(!decodedToken){
        return NextResponse.json({message:"user is not authenticated",status:401})
    }
  
    const response =NextResponse.json({message:"logout successful",status:200,success:true})
    response.cookies.set("token","",{httpOnly:true,maxAge:0});
    return response;
    }catch(error:any){
    console.log("something went wrong in logout",error);
    return NextResponse.json({message:"something went wrong in logout",status:500})
    }


}