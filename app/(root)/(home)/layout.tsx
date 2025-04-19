import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { ReactNode} from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <StreamVideoProvider>
    <main className='relative'>
    <Navbar/>
    <div className='flex'>
        <Sidebar/>
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 bg-dark-1 max-md:pb-14 sm:px-14'>
            <div className='w-full'>
                {children}
            </div>
        </section>
    </div>
    <footer>Footer</footer>    
    </main>
    </StreamVideoProvider>
  )
}

export default HomeLayout