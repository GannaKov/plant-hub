// we changed User to CustomUser in the next-auth.d.ts file
import NextAuth, { User } from 'next-auth';
import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.login, credentials.login.toString()))
          .limit(1);

        if (user.length === 0) return null;
        // CHANGE IT TO HASHED PASSWORD !!!!!!!!!!!!!!

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );
        // That is only for testing purposes, remove it later !!!!!!!!!!!
        // const isPasswordValid = credentials.password === user[0].password;

        if (!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          // name: user[0].login,
          fullName: user[0].fullName,
          login: user[0].login,

          //   name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.login = user.login;
        token.fullName = user.fullName;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.login = token.login as string;
        session.user.fullName = token.fullName as string;
      }

      return session;
    },
  },
});
