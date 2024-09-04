import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { validateUserLogin } from './actions/actions';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // logic to verify if the user exists
        const user = await validateUserLogin(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          return null;
        }

        // return user object with their profile data
        return { _id: user.id.toString(), email: user.email, name: 'asdf' };
      },
    }),
  ],
});
