// lib/tokenProvider.ts
'use server'

import { StreamClient } from '@stream-io/node-sdk';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;


export const tokenProvider = async (): Promise<string> => {
  
  const res=await fetch('/api/me');
  
  console.log('token Provider')
  
  try {
    if(res.ok){
      const data = await res.json();
      const user=data.user;
      if(user){
        console.log(apiKey);
        console.log(apiSecret);
        const client = new StreamClient(apiKey, apiSecret);
        const streamToken = client.generateUserToken({
          user_id: user.id.toString(),
          validity_in_seconds: 60 * 60,
        });
        return streamToken;
      }else{
        console.log('user not found');
        throw new Error('No user found');
      }
    }
    else{
      throw new Error('No user found');
    }
    
    
    
  }  
    
    
   catch (error: any) {
    console.error('Token provider error:', error.message);
    throw new Error('Failed to generate token');
  }
};


