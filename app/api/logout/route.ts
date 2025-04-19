import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the token cookie by setting it to an empty value and setting an expiry date in the past
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/', // Ensure it matches the path of the original cookie
  });

  return response;
}