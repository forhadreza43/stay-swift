'use server';

import { signIn } from '@/lib/auth-client';

const signInWithGithub = async () => {
   const data = await signIn.social({ provider: 'github' });
   return data;
};

const signInWithGoogle = async () => {
   const data = await signIn.social({
      provider: 'google',
   });
   return data;
};

export { signInWithGithub, signInWithGoogle };
