import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
username:{
    type:String,
    required:[true,"Username is required"],
    unique:true
},
email:{
    type:String,
    required:[true,"Email is required"],
    unique:true
},
password:{
    type:String,
    required:[true,"Password is required"],
    unique:true,
    min:6
},
isVerified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
forgotPasswordToken:String,
forgotPasswordTokenExpiry:Date,
verifyToken:String,
verifyTokenExpiry:Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;