import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function BookingCardSkeleton() {
   return (
      <>
      <div className="bg-gray-300 p-4 rounded-md">
         <div className="flex justify-between items-center ">
            <div>
               <Skeleton className="h-6 w-48" />
               <div className="text-sm my-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-32" />
               </div>
            </div>
            <div>
               <Skeleton className="h-6 w-24 mb-2" />
               <Skeleton className="h-4 w-40" />
            </div>
         </div>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
         <div className="flex justify-between items-center ">
            <div>
               <Skeleton className="h-6 w-48" />
               <div className="text-sm my-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-32" />
               </div>
            </div>
            <div>
               <Skeleton className="h-6 w-24 mb-2" />
               <Skeleton className="h-4 w-40" />
            </div>
         </div>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
         <div className="flex justify-between items-center ">
            <div>
               <Skeleton className="h-6 w-48" />
               <div className="text-sm my-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-32" />
               </div>
            </div>
            <div>
               <Skeleton className="h-6 w-24 mb-2" />
               <Skeleton className="h-4 w-40" />
            </div>
         </div>
      </div>
      <div className="bg-gray-300 p-4 rounded-md">
         <div className="flex justify-between items-center ">
            <div>
               <Skeleton className="h-6 w-48" />
               <div className="text-sm my-4">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-32" />
               </div>
            </div>
            <div>
               <Skeleton className="h-6 w-24 mb-2" />
               <Skeleton className="h-4 w-40" />
            </div>
         </div>
      </div>
      </>
   );
}
