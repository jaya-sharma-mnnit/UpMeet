'use client'


import { sidebarLinks } from "@/constants";
import  Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import React from "react";

const Sidebar = () => {
    const pathname=usePathname();
  return (
    

    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between 
    bg-sky p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex- flex-col gap-6">
        {sidebarLinks.map((link)=>{
            //link is currently active;
            //starts with for routes like meeting/123
            const isActive=pathname ===link.route;

            return (
                
                <Link
                href={link.route}
                key={link.label}
                className={`flex gap-4 items-center p-4 rounded-lg justify-start ${isActive ? 'bg-[#0E78F9]' : ''}`}>
                  <Image 
                  src={link.imgUrl}
                  alt={link.label}
                  width={24}
                  height={24}

                  />
                  <p className="text-lg font-semibold max-lg:hidden ">{link.label}</p>
                </Link>
            )
        })}
      </div>
    </section>
  );
};

export default Sidebar;
