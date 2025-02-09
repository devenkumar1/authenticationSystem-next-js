'use client'
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';
function Home() {
const navigate=useRouter();
const handleLogout=async()=>{
    try {
      const response= await axios.get("/api/users/logout");
      if(response.data.success){
        navigate.push("/login");
      }
    } catch (error) {
        console.log(error);
    }
}
  return (
   <div>
    <div>Home</div>
    <button onClick={handleLogout}>logout</button>
   </div>
  )
}

export default Home