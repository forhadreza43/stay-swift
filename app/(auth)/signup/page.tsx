import SignUp from '@/components/auth/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Sign Up',
   description: 'Create a new account with StaySwift',
};
const SignUpPage = () => {
   return (
      <section className="h-screen grid place-items-center container">
         <div className="max-w-md w-full mx-auto">
            <SignUp/>
         </div>
      </section>
   );
};

export default SignUpPage;
