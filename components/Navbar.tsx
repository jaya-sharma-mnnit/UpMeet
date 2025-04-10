import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='flex justify-between h-50 fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
     <Link href="/" className='flex items-centergap-1 '>
      <Image src="/icons/logo.svg" width={38} height={38} alt="UpMeet-logo" className='max-sm:size-10'/>
      <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
        UpMeet
      </p>
     </Link>
     <div className='flex justify-between gap-5 sm:hidden  '>
      {/*user management*/}
      <MobileNav/>
     </div>
    </nav>
  )
}

export default Navbar
