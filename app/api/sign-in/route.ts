import { NextResponse } from 'next/server';
import dbConnect from '@/app/helper/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request ) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect Password." }, { status: 401 });
    }

    const { password: _, ...safeUser } = user.toObject();
        // Create JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!, // Define this in your `.env.local`
            { expiresIn: '7d' }
          );
      
          // Set cookie
          const response = NextResponse.json({ message: "Sign-in successful!", user:safeUser }, { status: 200 });
      
          response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });
        
          return response;

  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}