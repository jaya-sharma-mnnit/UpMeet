'use client'

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@/lib/useUser";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/providers/toastProvider";
import  ReactDatePicker  from "react-datepicker";

const MeetingTypeList = () => {
    
    const [ MeetingState,setMeetingState]= useState<'isScheduleMeeting' |'isJoiningMeeting'|'isInstantMeeting'|undefined>();
    //renavigate to recordings on click for that we use a router
    const router=useRouter();

    
    const{ user ,isLoaded}=useUser();
    const client=useStreamVideoClient();
    const[values,setValues]=useState({
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
        console.log("callDetails set");
        

        if(!values.description){
          router.push(`/meeting/${call.id}`);
        }
        addToast('meeting created','success');
        console.log("toast added");

      }catch(error){
        console.log(error);
        addToast('Failed to create meeting','error');
      }
    }
    
    const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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

      {!callDetails ? (
        <MeetingModal
        isOpen={MeetingState==='isScheduleMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">Add a description</label>
            <textarea value={values.description}  onChange={(e) =>{
                setValues({ ...values, description: e.target.value });
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;}
              }
            className="bg-dark-3 text-white h-9 px-2 py-2 rounded-md w-full focus:outline-none overflow-hidden resize-none " />
            </div>
            <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">Select date and time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 px-2 py-2 focus:outline-none"
            />
            </div>
          
          </MeetingModal>
      ):(
        <MeetingModal
      isOpen={MeetingState==='isScheduleMeeting'}
      onClose={()=>setMeetingState(undefined)}
      title="Meeting Created"
      
      handleClick={()=>{
        navigator.clipboard.writeText(meetingLink);
        addToast('Link copied','success');
      }}
      image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
      />
      )}
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
