'use client';
import Link from 'next/link';
import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';

function VerifyEmail() {
    const [token, setToken] = useState('');
    const[verified,setVerified]= useState(false);
const verifyUserEmail=async()=>{
    try {
        await axios.post('/api/users/verifyemail',{token});
        setVerified(true);
    } catch (error) {
        console.log(error);
    }
}
useEffect(()=>{
const urlToken = window.location.search.split("=")[1];
setToken(urlToken ||"");
},[])


useEffect(() => {
    if(token.length>0){
        verifyUserEmail();
    }
},[token])

return(
    <div className='flex flex-col item-center justify-center min-h-screen py-2 w-full'>
        <h1 className='text-4xl'>
            verify email
        </h1>
        <h2 className='p-2  '>{token ? `Token:${token}`:"No token found"}</h2>
        {verified && <h2 className='text-2xl'>Email verified successfully</h2>}
        <Link className='underline' href="/login">login</Link>
    </div>
)
}

export default VerifyEmail