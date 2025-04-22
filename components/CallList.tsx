'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/lib/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/providers/toastProvider';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
 // const toast=useToast();
  const getCalls = () => {
    
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        //console.log(recordings);
        return recordings;
      case 'upcoming':
        
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!callRecordings || callRecordings.length === 0) {
        console.log('No call recordings available.');
        return;
      }
  
      try {
        const callData = await Promise.all(
          callRecordings.map((call) => call.queryRecordings())
        );
  
        const allRecordings = callData
          .map(data => data.recordings)
          .flat();
  
        console.log('All fetched recordings:', allRecordings);
  
        setRecordings(allRecordings);
      } catch (error) {
        console.error("Error fetching recordings:", error);
        
      }
    };
  
    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);
  
  if (isLoading) return <Loader />;

  const calls = getCalls();
  
  const noCallsMessage = getNoCallsMessage();

  

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0,30)  ||
              
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;