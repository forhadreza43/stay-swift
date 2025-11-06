import { db, client } from '@/db/mongo-client';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

export const auth = betterAuth({
   database: mongodbAdapter(db, { client }),
   emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      // async sendResetPassword(data, request) {
      //    // Send an email to the user with a link to reset their password
      // },
   },
   socialProviders: {
      github: {
         clientId: process.env.GITHUB_CLIENT_ID as string,
         clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      google: {
         prompt: 'select_account',
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
   },
});
