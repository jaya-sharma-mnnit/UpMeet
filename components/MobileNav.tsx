'use client';
import React from 'react'
import Image from 'next/image'
import { useState ,useEffect,useRef} from 'react';


const MobileNav = () => {
  const [isOpen,setIsOpen]=useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  return (
    <>
    <button
        onClick={() => setIsOpen(true)}>
        <Image src="./icons/hamburger.svg" height={36} width={36} alt="hamburger"/>
        </button>

        {isOpen && (
        <div className='fixed inset-0 z-40'>
          {/* Overlay */}
          <div className=' absolute inset-0 bg-black bg-opacity-40 transition-opacity'></div>

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className='absolute left-0 top-0 h-full w-64  bg-dark-2 shadow-lg p-6 transform transition-transform duration-300 ease-in-out translate-x-0'>
            <h2 className='flex gap-1 items-center text-xl font-bold mb-4'>
              <Image src="/icons/logo.svg" width={36} height={36} alt="UpMeet-logo" className='max-sm:size-10'/>
                    <p className='text-[22px] font-extrabold text-white '>
                      UpMeet
                    </p>
            </h2>
            <ul className='space-y-4 pt-5'>
              <li className=' flex gap-2 items-center  cursor-pointer px-2  h-10 text-white text-md hover:bg-[#0E78F9] rounded-md'>
              <Image src="./icons/Home.svg" alt="" width={20} height={20}/>
                <p className='font-semibold'>Home</p>
                
                  </li>
              <li className='flex gap-2 items-center cursor-pointer px-2  h-10 text-white text-md hover:bg-[#0E78F9] rounded-md'>
              <Image src="./icons/upcoming.svg" alt="" width={20} height={20}/>
                <p className='font-semibold'>Upcoming
                </p></li>
              <li className='flex gap-2 items-center cursor-pointer px-2  h-10 text-white text-md hover:bg-[#0E78F9] rounded-md'>
                <Image src="./icons/previous.svg" alt="" width={20} height={20}/>
                <p className='font-semibold'>
                  Previous
                </p>
              </li>
              <li className='flex gap-2 items-center cursor-pointer px-2 h-10 text-white text-md hover:bg-[#0E78F9] rounded-md'>
              <Image src="./icons/Video.svg" alt="" width={20} height={20}/>
                <p className='font-semibold'>
                  Recordings
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav
