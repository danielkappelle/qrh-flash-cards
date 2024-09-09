import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { validateToken, validateUserLogin } from './actions/actions';
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
        token: {},
      },
      authorize: async (credentials) => {
        // check if this is a token login
        if (credentials.token) {
          const valid = await validateToken(credentials.token as string);
          if (valid) {
            return {
              _id: credentials.token,
              email: 'noone@nohost',
              name: 'user',
            };
          } else {
            return null;
          }
        } else {
          // logic to verify if the user exists
          const user = await validateUserLogin(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) {
            return null;
          }

          // return user object with their profile data
          return {
            _id: user.id.toString(),
            email: user.email,
            name: 'admin',
          };
        }
      },
    }),
  ],
});
