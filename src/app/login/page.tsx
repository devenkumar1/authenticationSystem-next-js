'use client';
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
function Login() {
const [formData,setFormData]=useState({
    email:"",
    password:""
})
const navigate=useRouter();

const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        const response= await axios.post("/api/users/login",formData);
        console.log(response.data);
        if(response.data.success){
            navigate.push("/home");
        }

    } catch (error) {
        console.log("error in signin",error);
    }
}


    return (
        <div className="flex h-screen justify-center items-center text-black">
            <div className="bg-white p-8 rounded-md w-96">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input type="email" name="email" id="email" 
                     value={formData.email}
                     onChange={handleChange}
                     className="border-2 border-gray-300 p-2 rounded-md w-full"
                     />
                    <label htmlFor="password" className="block mb-2">password</label>
                    <input type="password" name="password" id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="border-2 border-gray-300 p-2 rounded-md w-full"
                     />
                      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">login</button>
                </form>
                <p className="text-center mt-3">don't have an account <span className="text-center text-blue-500"><Link href="/signup">signup</Link></span></p>
                
            </div>
        </div>
    )
}

export default Login

