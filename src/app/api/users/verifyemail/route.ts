import connectDB from "@/dbconfig/dbconfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
connectDB();

export async function POST(req:NextRequest){
    try {
        const reqBody=await req.json();
        const {token}=reqBody;
    const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
    if(!user){
        return NextResponse.json({message:"invalid token",status:400})

    }
    //log
    console.log(user);
    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpiry=undefined;
    await user.save();
    return NextResponse.json({message:"email verified successfully",status:200,success:true})
    

    } catch (error) {
        return NextResponse.json({message:"something went wrong",status:500})
    }
}