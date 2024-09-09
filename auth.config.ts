import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/request-token',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn) {
        return false;
      }

      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isAdmin = auth?.user?.name === 'admin';
      if (isOnAdmin && !isAdmin) {
        return false;
      } else {
        return true;
      }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
