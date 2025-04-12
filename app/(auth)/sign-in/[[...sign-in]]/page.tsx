"use client";
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router=useRouter();
  const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
    const [loading, setLoading] = useState(false);
    

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      setLoading(true);

  
    
      if (!email || !password) {
        console.warn("Please fill in both fields");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("✅ User signed in:", data);
          
          setEmail("");
          setPassword("");
          setLoading(false);
          router.push("/");
          
        } else {
          setLoading(false);
          console.warn("⚠️ Sign-in failed:", data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("❌ Network error during sign-in:", error);
        setLoading(false);
      }
      
    }
  return (
      <div className='flex items-center justify-center h-screen w-full bg-dark-1 '>
              <div className='h-30 w-[400px] bg-dark-2 text-3xl rounded-2xl shadow-xl'>
              <div className="pt-4 flex flex-col items-center space-y-4">
                  <Image src="./icons/logo.svg" width={36} height={36} alt=""/>
                  <p className='text-2xl font-semibold'>UpMeet</p>
                  <p className="text-sm text-gray-400">Welcome back!</p>
              </div>
              
      <form className="mt-6 px-4 space-y-8 " onSubmit={handleSubmit} >
      <input
        type="email"
        value={email}
        placeholder="email address"
        onChange={(e)=>{
            
            setEmail(e.target.value)
        }}
        className="w-full px-4 py-2  h-10 rounded-lg bg-dark-1 text-white text-sm placeholder-gray-400 outline-1 "
      />
      
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>{
           setPassword(e.target.value)
        }}
        className="w-full px-4 py-2 h-10 rounded-lg  bg-dark-1 text-white text-sm placeholder-gray-400 outline-1 "
      />
      
      <button
        type="submit"
        disabled={loading}
        className= {`w-full py-2 mt-2 h-10 rounded-lg ${
          loading ? "bg-blue-300" : "bg-[#0E78F9]  hover:bg-blue-700"}
         transition-colors duration-200 text-white text-sm font-semibold`}
      >
      
        {loading ? "Signing in..." : "Continue →"}
      </button>
      </form>
      <div className="mt-6 pb-6 text-center text-sm text-gray-400">
      Do not have an account? <Link href="/sign-up" className="text-blue-400 hover:underline">Sign up</Link>
    </div>
      </div>
  </div>
  )
}

export default SignIn