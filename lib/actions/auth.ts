'use server';

// import { eq } from 'drizzle-orm';
// import { db } from '@/database/drizzle';
// import { users } from '@/database/schema';
// import { hash } from 'bcryptjs';
import { signIn } from '@/auth';

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'login' | 'password'>
) => {
  const { login, password } = params;
  try {
    const result = await signIn('credentials', {
      login,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, 'Signin error');
    return { success: false, error: 'Signin error' };
  }
};
