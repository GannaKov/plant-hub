import NextAuth from 'next-auth';

// here we are extending the default session and User (from next-auth) objects
declare module 'next-auth' {
  interface User {
    id: string;
    login: string;
    fullName: string;
  }

  interface Session {
    user: {
      id: string;
      login: string;
      fullName: string;
    };
  }

  interface JWT {
    id: string;
    login: string;
    fullName: string;
  }
}
