// app/api/token/route.ts
import {cookies} from 'next/headers';
import { StreamClient } from '@stream-io/node-sdk';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/helper/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET_KEY!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    console.error('No token found in cookies');
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    await dbConnect();
    const user = await User.findById(decoded.id).select('-password');
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // console.log(user);
    const client = new StreamClient(apiKey, apiSecret);
    console.log(apiSecret)
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
    const streamToken = client.generateUserToken({user_id: user.id.toString(),
      exp:expirationTime,
      iat:issuedAt
    });
    
    return NextResponse.json({ token: streamToken }, { status: 200 });
  } catch (error: any) {
    console.error('Token generation failed:', error.message);
    return NextResponse.json({ error: 'Token generation failed' }, { status: 500 });
  }
}
