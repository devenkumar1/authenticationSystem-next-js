'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link';

function Signup() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await axios.post('/api/users/signup', {
        username,
        email,
        password
      })

      router.push('/login')
    } catch (error:any) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-black">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md w-96">
        <h2 className="text-3xl font-bold mb-4">Sign up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Sign up
        </button>
      </form>
      <p>Already have an account</p>
                <span><Link href="/signup">signup</Link></span>
    </div>
  )
}

export default Signup
