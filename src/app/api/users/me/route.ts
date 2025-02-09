import { NextResponse,NextRequest } from "next/server";
import { getUserData } from "@/helpers/getUserData";
import User from "@/models/userModel";
import connectDB from "@/dbconfig/dbconfig";

connectDB();

export async function GET(req:NextRequest){
    try{
        const userId = await getUserData(req);
        if(!userId) return NextResponse.json({message:"user is not authenticated",status:401})
        const user = await User.findById(userId).select("-password");
        if(!user) return NextResponse.json({message:"user not found",status:404});
        return NextResponse.json({message:"user found",status:200,success:true,user});
    }catch(error:any){
        return NextResponse.json({message:"something went wrong",status:400})
    }
}