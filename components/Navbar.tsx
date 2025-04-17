"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav';
import UserLogo from './UserLogo';
import { useState ,useEffect} from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   // Fetch login status on mount
   useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/verify'); 
        
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          
          setIsLoggedIn(false);
        }
      } catch (err) {
        
        console.error("Auth check failed:", err);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  
  return (
    <nav className='flex justify-between h-50 fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
     <Link href="/" className='flex items-centergap-1 '>
      <Image src="/icons/logo.svg" width={38} height={38} alt="UpMeet-logo" className='max-sm:size-10'/>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
        UpMeet
      </p>
     </Link>
     <div className='flex items-center gap-5'>
     {isLoggedIn ? <UserLogo onLogout={() => setIsLoggedIn(false)} /> : (
          <Link href="/sign-in" className='text-white font-sans cursor-pointer'>
            Sign in
          </Link>
        )}
 
     <div className='flex justify-between gap-5 sm:hidden  '>
      
      <MobileNav/>
     </div>
     </div>
    </nav>
  )
}

export default Navbar
