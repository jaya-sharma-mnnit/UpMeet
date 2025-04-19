'use client'

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@/lib/useUser";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/providers/toastProvider";

const MeetingTypeList = () => {
    const [ MeetingState,setMeetingState]= useState<'isScheduleMeeting' |'isJoiningMeeting'|'isInstantMeeting'|undefined>();
    //renavigate to recordings on click for that we use a router
    const router=useRouter();

    const{ user ,isLoaded}=useUser();
    const client=useStreamVideoClient();
    const[values,setvalues]=useState({
      dateTime: new Date(),
      description:'',
      link:'',
    })
    const [callDetails,setcallDetails]=useState<Call>();
    const { addToast } = useToast()
    const createMeeting = async()=>{
      if( !user){
        console.log('no user found');
        return ;
      }else if(!client){
        console.log('no client found');
        return ;
      }
      
      
     
      try{

        if(!values.dateTime){
          addToast("Please select a date and time")
        }

        const id = crypto.randomUUID();
        const call =client.call('default',id);

        if(!call) throw new Error('failed to get a call');

        const startAt=values.dateTime.toISOString()||new Date(Date.now()).toISOString();
        const description=values.description || 'Instant meeting';

        await call.getOrCreate({
          data:{
            starts_at:startAt,
            custom:{
              description
            },

          }
        })

        setcallDetails(call);
        setMeetingState(undefined);

        if(!values.description){
          router.push(`/meeting/${call.id}`);
        }
        addToast('meeting created','success')
      }catch(error){
        console.log(error);
        addToast('Failed to create meeting','error');
      }
    }
    
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
      img="icons/add-meeting.svg"
      title="New Meeting"
      description="Start an instant meeting"
      handleClick={()=>{
        setMeetingState('isInstantMeeting')
      }}
      className="bg-orange-1"/>
      <HomeCard
      img="icons/schedule.svg"
      title="Schedule Meeting"
      description="Plan your meeting"
      handleClick={()=>{
        setMeetingState('isScheduleMeeting')
      }}
      className="bg-blue-1"/>
      
      <HomeCard
      img="icons/recordings.svg"
      title="View Recordings"
      description="Checkout your recordings"
      handleClick={()=>{
        router.push('/recordings')
      }}
      className="bg-purple-1"/>

      <HomeCard
      img="icons/join-meeting.svg"
      title="Join meeting"
      description="via invitation link"
      handleClick={()=>{
        setMeetingState('isJoiningMeeting')
      }}
      className="bg-yellow-1"/>

      <MeetingModal
      isOpen={MeetingState==='isInstantMeeting'}
      onClose={()=>setMeetingState(undefined)}
      title="Start an Instant Meeting"
      className="text-centre"
      handleClick={createMeeting}
      buttonText="Start Meeting"
      />
    </section>
  );
};

export default MeetingTypeList;
