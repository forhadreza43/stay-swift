import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
   // baseURL is optional when using the same domain
   // Omitting it allows relative paths to work automatically
});

export const { signIn, signOut, signUp, useSession } = authClient;
