import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    console.log('Not authenticated');
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('decoded');
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (err) {
    console.log('Invalid token');
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}