
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { ToastProvider } from '@/providers/toastProvider'
import React, { ReactNode } from 'react'

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
