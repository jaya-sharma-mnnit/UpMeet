"use client";
import React from 'react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';


const UserLogo = ({ onLogout }: { onLogout: () => void }) => {
    const userImage = "/icons/woman-user-circle-icon.svg";
    const [isOpen, setIsOpen] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(true); // Assume user is logged in initially
   

    const handleLogout = async () => {
        // Send a request to the logout API to clear the cookie
        try {
          const response=await fetch('/api/logout', {
            method: 'GET',
          });
    
         if(response.ok){
            console.log("Logged out succesfully!");
            setIsOpen(false);
            onLogout();
         }
          
        } catch (error) {
          console.log("Unable to log you out ", error);
         
        } 
    };

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


    
  return (
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
  )
}

export default UserLogo
