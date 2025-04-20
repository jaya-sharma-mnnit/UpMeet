'use client'
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React,{useState} from 'react';
import LayoutDropDown from './LayoutDropDown';
import { Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType='grid'|'speaker-left' |'speaker-right';

const MeetingRoom = () => {
  const [layout,setLayout]= useState<CallLayoutType>('speaker-left');
  const [showParticipants , setShowParticipants] = useState(false);
 
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const CallLayout=()=>{
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout/>
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="left"/>
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="right"/>
    }
  }
  const handleSelect = (option: string) => {
    if (option === 'grid') setLayout('grid');
    else if (option === 'left') setLayout('speaker-left');
    else if (option === 'right') setLayout('speaker-right');
    
  };
  
  const { useCallCallingState } = useCallStateHooks();

  
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white pb-4'>
      <div className='relative flex size-full items-center justify-center '>
        <div className='flex size-full max-w-[1000px] items-center'>
        <CallLayout/>
        </div>
        <div className={`${!showParticipants ? 'hidden' : ''} h-[calc(100vh-86px)]  ml-2`}>
          <CallParticipantsList onClose={()=>{
            setShowParticipants(false);}
          }/>
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-3 flex-wrap pt-2'>
        <CallControls/>

        <LayoutDropDown onSelect={setLayout} />

      <CallStatsButton/>
      <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/> }
      </div>
      </section>
  )
}

export default MeetingRoom