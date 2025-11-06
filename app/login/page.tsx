import SignIn from '@/components/auth/sign-in';

const LoginPage = () => {
   return (
      <section className="h-screen grid place-items-center">
         <div className="max-w-md w-full mx-auto">
            <SignIn />
         </div>
      </section>
   );
};

export default LoginPage;
