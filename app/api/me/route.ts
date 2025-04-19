// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/helper/dbConnect';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
