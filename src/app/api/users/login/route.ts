import bcrypt from 'bcryptjs'
import User from '@/models/userModel.js';
import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/dbconfig/dbconfig";

connectDB();
export async function POST(req:NextRequest){
    const reqBody = await req.json();
    const {email,password} = reqBody;
    if(!email || !password){
        return NextResponse.json({message:"Email and Password are required",status:400})
    }
try {
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({message:"account doesn't exist", status:400})
    }
    const matchPassword= await bcrypt.compare(password,user.password);
    if(!matchPassword){
        return NextResponse.json({message:"Password is incorrect", status:400})
    }
    const userData = await User.findOne({email}).select("-password");
    const token= jwt.sign({id:user._id, email:user.email, username:user.username},process.env.JWT_SECRET!,{expiresIn:"7d"});

    const response= NextResponse.json({ message: "Login successful", status: 200, success: true, token, userData: userData });
    
    response.cookies.set(
    "token", token, 
    { httpOnly: true });
    return response;
} catch (error) {
    console.log("something went wrong while login",error);
    return NextResponse.json({message:"sigin failed",status:500}) 
}
}