"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router=useRouter();
  const handleLogout = async () => {
    // Send a request to the logout API to clear the cookie
    try {
      await fetch('/api/logout', {
        method: 'GET',
      });

      router.push('/sign-in');
      
    } catch (error) {
      console.log("Unable to log you out ", error);
    } 

    
    
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userImage = "/icons/woman-user-circle-icon.svg";

  return (
    <nav className='flex justify-between h-50 fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
     <Link href="/" className='flex items-centergap-1 '>
      <Image src="/icons/logo.svg" width={38} height={38} alt="UpMeet-logo" className='max-sm:size-10'/>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
        UpMeet
      </p>
     </Link>
     <div className='flex items-center gap-5'>
        {/* user profile photo */}
        <div className='relative' ref={dropdownRef}>
          <Image
            src={userImage}
            alt="User Profile"
            width={40}
            height={40}
            className='rounded-full cursor-pointer '
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-dark-2 rounded-lg shadow-lg z-50'>
              <Link
                href="/account"
                className='block px-4 py-2 text-white hover:bg-dark-1'
              >
                Manage Account
              </Link>
              <button
                onClick={handleLogout}
                className='w-full text-left px-4 py-2 text-white hover:bg-dark-1'
              >
                Log Out
              </button>
            </div>
          )}
        </div>
        
     <div className='flex justify-between gap-5 sm:hidden  '>
      {/*user management*/}
      
      <MobileNav/>
     </div>
     </div>
    </nav>
  )
}

export default Navbar
