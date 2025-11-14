import BookingCard from '@/components/boooking/BookingCard';
import BookingCardSkeleton from '@/components/skeleton/BookingCardSkeleton';
import { Booking } from '@/types/types';
import { Suspense } from 'react';

const PastBooking = ({ bookings }: { bookings: Booking[] }) => {
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-bold">🕛️ Past Bookings</h2>

         {bookings.length === 0 ? (
            <p className="text-gray-600 text-center py-13 bg-[#ebf6e9] p-4 rounded-md">
               No past bookings.
            </p>
         ) : (
            <Suspense fallback={<BookingCardSkeleton />}>
               <div className="space-y-4">
                  {bookings.map((booking) => (
                     <BookingCard key={booking.id} booking={booking} fromPastBooking={true} />
                  ))}
               </div>
            </Suspense>
         )}
      </div>
   );
};

export default PastBooking;
