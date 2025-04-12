'use client'

import React from 'react'
import Image from 'next/image'

//defination of types of homecard props
//interface is the type that is extendble
interface HomeCardProps{
  className:string,
  img:string,
  title:string,
  description:string,
  handleClick:()=>void

}
const HomeCard = ({className,img,title,description,handleClick}: HomeCardProps) => {
  return (
    <div
        className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]
        cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex justify-center size-12 rounded-[10px] backdrop-blur-md bg-white/20 border border-white/10">
          <Image
            src={img}
            alt="meetings"
            width={27}
            height={27}
          />
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{title}</h1>
            <p className="font-normal text-lg">{description}</p>
        </div>
      </div>
  )
}

export default HomeCard;