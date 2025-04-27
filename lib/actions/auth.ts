'use server';

// import { eq } from 'drizzle-orm';
// import { db } from '@/database/drizzle';
// import { users } from '@/database/schema';
// import { hash } from 'bcryptjs';
import { signIn } from '@/auth';
import { signOut } from '@/auth';
import { headers } from 'next/headers';
import ratelimit from '@/lib/ratelimit';
import { redirect } from 'next/navigation';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'login' | 'password'>
) => {
  const { login, password } = params;
  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect('/too-fast');
  try {
    const result = await signIn('credentials', {
      login,
      password,
      redirect: false,
    });
    console.log('result', result);
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, 'Signin error');
    return { success: false, error: 'Signin error' };
  }
};

export const logout = async () => {
  await signOut();
};
