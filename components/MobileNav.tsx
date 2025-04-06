import React from 'react'
import Image from 'next/image'

const MobileNav = () => {
  return (
    <section className='w-full max-w-[246px]'>
        <Image src="./icons/hamburger.svg" height={36} width={36} alt="hamburger"/>
    </section>
  )
}

export default MobileNav
