import BookingCard from '@/components/boooking/BookingCard';
import BookingCardSkeleton from '@/components/skeleton/BookingCardSkeleton';
import { Booking } from '@/types/types';
import { Suspense } from 'react';

const UpcomingBooking = ({ bookings }: { bookings: Booking[] }) => {
  //  console.log(bookings);
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-bold">⌛️ Upcomming Bookings</h2>

         {bookings.length === 0 ? (
            <p className="text-gray-600 text-center py-13 bg-[#ebf6e9] p-4 rounded-md">
               No upcoming bookings.
            </p>
         ) : (
            <Suspense fallback={<BookingCardSkeleton />}>
               <div className="space-y-4">
                  {bookings.map((booking) => (
                     <BookingCard key={booking.id} booking={booking} />
                  ))}
               </div>
            </Suspense>
         )}
      </div>
   );
};

export default UpcomingBooking;
