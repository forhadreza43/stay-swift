import SignIn from '@/components/auth/sign-in';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Login',
   description: 'Log in to your account with StaySwift',
};
const LoginPage = () => {
   return (
      <section className="h-screen grid place-items-center container">
         <div className="max-w-md w-full mx-auto">
            <SignIn />
         </div>
      </section>
   );
};

export default LoginPage;
