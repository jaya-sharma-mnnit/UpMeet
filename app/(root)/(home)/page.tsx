import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react';

const Home = async() => {
  
  const now =new Date();
  const year = now.getFullYear();
  const month = now.toLocaleDateString('en-US', { month: 'long' });

  const day = String(now.getDate()).padStart(2, '0');
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover '>
        <div className='flex h-full flex-col justify-between max-md:py-8 lg:p-11
        '>
          <h2 className='backdrop-blur-md bg-white/20 border border-white/10 rounded py-2 text-base shadow-lg font-normal max-w-[270px] text-center'>
          Upcoming Meeting at: 12:30 PM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p>{dayName}, {month} {day},{year}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList/>
    </section>
  )
}

export default Home
