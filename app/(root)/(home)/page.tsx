import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import  jwt  from 'jsonwebtoken';

const Home = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token'); // or whatever key you use

  if (!token) {
    redirect('/sign-in');
  }
  try {
    const user = jwt.verify(token.value, process.env.JWT_SECRET!);
    // Render home page using `user` data
  } catch {
    redirect('/sign-in');
  }
  return (
    <section className="flex size-full flex-col gp-10 text-white">
      <h1 className="text-3xl font-bold">
        Home
      </h1>
    </section>
  )
}

export default Home
