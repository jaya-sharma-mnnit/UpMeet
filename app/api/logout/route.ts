import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect('http://localhost:3000/sign-in');

  // Clear the token cookie by setting it to an empty value and setting an expiry date in the past
  response.cookies.set('token', '', { expires: new Date(0) });

  return response;
}