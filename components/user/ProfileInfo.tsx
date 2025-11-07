import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const ProfileInfo = async () => {
   const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
   });

  //  console.log(session);
   return (
      <div className="flex flex-col items-center py-8 text-center">
         <div className="relative max-h-[180px] max-w-[180px] rounded-full lg:mb-8 h-[100px] w-[100px] grid place-items-center text-4xl text-white">
            <Avatar className='w-full h-full ring-2 ring-primary ring-offset-2'>
               <AvatarImage src={(session?.user?.image && session?.user?.image) || ''} />
               <AvatarFallback className="font-semibold bg-primary">
                  {session?.user?.name[0]}
               </AvatarFallback>
            </Avatar>
         </div>

         <div>
            <h3 className="text-2xl font-semibold lg:text-[28px]">
               {session?.user?.name || ''}
            </h3>
            <p className="leading-[231%] lg:text-lg">
               {session?.user?.email || ''}
            </p>
         </div>

         <div className="w-3/4 border-b border-[#a4a4a4] py-6 lg:py-4"></div>
      </div>
   );
};

export default ProfileInfo;
