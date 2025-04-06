'use client';
import React from 'react'
import Image from 'next/image'
import { useState ,useEffect,useRef} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';


const MobileNav = () => {
  const pathname=usePathname();
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
            <div className="pt-3 flex flex-col gap-4">
        {sidebarLinks.map((link)=>{
            //link is currently active;
           
            const isActive= pathname ===link.route ;

            return (
                
                <Link 
                onClick={() => setIsOpen(false)}
                href={link.route}
                key={link.label}
                className={`flex gap-4 items-center p-4 rounded-lg justify-start ${isActive ? 'bg-[#0E78F9]' : ''}`}>
                  <Image 
                  src={link.imgUrl}
                  alt={link.label}
                  width={20}
                  height={20}

                  />
                  <p className="text-lg font-semibold ">{link.label}</p>
                </Link>
            )
        })}
      </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav
