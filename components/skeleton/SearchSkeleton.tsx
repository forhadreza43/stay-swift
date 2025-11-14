import { Skeleton } from '@/components/ui/skeleton';

export default function SearchSkeleton() {
   return (
      <>
         <div className="lg:max-h-[250px] mt-6">
            <div className="bg-gray-300 w-full h-full py-10 lg:py-12 px-6 lg:px-8 rounded-xl  shadow-lg lg:flex items-center *:flex-1 *:px-4 [&>div>span]:mb-3 space-y-5 lg:space-y-0">
               <div className="flex flex-col gap-3">
                  <Skeleton className="h-5 w-32 mb-1.5 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
               </div>

               <div>
                  <h4 className="mt-2">
                     <Skeleton className="h-5 w-32 mb-1.5 rounded-md" />
                     <Skeleton className="h-10 w-full rounded-md" />
                  </h4>
               </div>

               <div>
                  <h4 className="mt-2">
                     <Skeleton className="h-5 w-32 mb-1.5 rounded-md" />
                     <Skeleton className="h-10 w-full rounded-md" />
                  </h4>
               </div>
            </div>
         </div>

         <Skeleton className="h-10 w-30 mt-0 rounded-md block px-5 mx-auto -translate-y-1/2" />
      </>
   );
}
