import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

export const getCurrentUserFromRequest = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value; 
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
