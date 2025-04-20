
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { ToastProvider } from '@/providers/toastProvider'
import React, { ReactNode } from 'react'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { Metadata } from 'next';

export const metadata :Metadata= {
  title: "YOOM",
  description: "A video-calling website built with Next.js",
  icons:{
    icon:'/icons/logo.svg'
  }
}; 

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    
    <StreamVideoProvider>
     <ToastProvider> 
    <main>
      
        {children}
      
    </main>
    </ToastProvider>
    </StreamVideoProvider>
    
    
  )
}

export default RootLayout
