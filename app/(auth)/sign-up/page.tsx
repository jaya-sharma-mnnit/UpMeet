'use client';
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';

const SignUp = () => {
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault(); 

  try {
    const response = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ User registered:", data);
      
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      console.warn("⚠️ Server responded with an error:", data.message );
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
  }
    }


    
  return (
    <div className='flex items-center justify-center h-screen w-full bg-dark-1 '>
        <div className='h-30 w-[400px] bg-dark-2 text-3xl rounded-2xl shadow-xl'>
        <div className="pt-4 flex flex-col items-center space-y-4">
            <Image src="./icons/logo.svg" width={36} height={36} alt=""/>
            <p className='text-2xl font-semibold'>UpMeet</p>
            <p className="text-sm text-gray-400">Create your account</p>
        </div>

        <form className="mt-6 px-4 space-y-8" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        placeholder="username"
        onChange={(e)=>{
            
            setUsername(e.target.value)
        }}
        className="w-full px-4 py-2  h-10 rounded-lg bg-dark-1 text-white text-sm placeholder-gray-400 outline-1 "
      />
      <input
        type="email"
        placeholder="email address"
        value={email}
        onChange={(e)=>{
           setEmail(e.target.value)
        }}
        className="w-full px-4 py-2 h-10 rounded-lg  bg-dark-1 text-white text-sm placeholder-gray-400 outline-1 "
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        className="w-full px-4 py-2 h-10 rounded-lg  bg-dark-1 text-white text-sm placeholder-gray-400 outline-1 "
      />

      <button
        type="submit"
        className="w-full py-2 mt-2 h-10 rounded-lg bg-[#0E78F9] hover:bg-blue-700 transition-colors duration-200 text-white text-sm font-semibold"
      >
        Continue →
      </button>
    </form>

    <div className="mt-6 pb-6 text-center text-sm text-gray-400">
      Already have an account? <a href="/sign-in" className="text-blue-400 hover:underline">Sign in</a>
    </div>


        </div>
      
    </div>
  )
}

export default SignUp
