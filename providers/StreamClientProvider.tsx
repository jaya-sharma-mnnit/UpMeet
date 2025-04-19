"use client";

import { useUser } from "@/lib/useUser";



import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';



import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  console.log('Testing stream video');
  const getToken = async () => {
    const res = await fetch('/api/token');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Token fetch failed');
    return data.token;
  };
  useEffect(() => {

    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');
    //console.log(user);
    
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?._id,
        name: user?.username || user?._id,
        image: user?.imageUrl,
      },
      tokenProvider: getToken,
    });
    
    
    setVideoClient(client);
  }, [user, isLoaded]);
  if(!user){
    return <div>{children}</div>;
  }
  if ( !videoClient) 
    return <Loader />;
  

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
  
};

export default StreamVideoProvider;