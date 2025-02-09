import connectDb from '@/dbconfig/dbconfig'
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModel.js';
import bcrypt from 'bcryptjs'
import { NextResponse,NextRequest } from 'next/server';

export async function POST(req:NextRequest){

    const reqBody=await req.json();
    const{username,email,password}=reqBody;
    if(!username || !email || !password){
        return NextResponse.json({message:"All fields are required",status:400})
    }
    try {

        const user= await User.findOne({email,username});
        if(user){
           return  NextResponse.json({message:"User already exists"},
                {status:400})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save();
          await sendEmail({email,emailType:"VERIFY",userId:newUser._id});    
        return NextResponse.json({message:"user created successfully", status:201,success:true,newUser})
    } catch (error:any) {
        return NextResponse.json({message:error.message},
            {status:500})
    }
}



connectDb();

