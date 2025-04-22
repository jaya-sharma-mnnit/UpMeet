'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/lib/useGetCallById';
import { useUser } from '@/lib/useUser';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
const Meeting = () => {
  const { id } = useParams(); 
  if(!id) throw new Error('client failed') ;
  const {user,isLoaded}=useUser()
  const[isSetupComplete,setIsSetupComplete]= useState(false);
  const{call,isCallLoading}=useGetCallById(id);
  if(!call){
    console.log("no call")
  }
  if(!isLoaded||isCallLoading||!call) return <Loader/>
  return (
    <main className='h-scree w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupComplete?(
              <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
            ):(
              <MeetingRoom/>
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting 