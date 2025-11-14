import { Booking } from '@/types/types';
import { getDayDifference } from '@/utils/data-util';
import { getHotelById } from '@/utils/queries';

export default async function BookingCard({ booking, fromPastBooking=false }: { booking: Booking, fromPastBooking?: boolean }) {
   const { data: hotel } = await getHotelById(booking?.hotelId);
   const duration = getDayDifference(booking?.checkin?.toISOString().split('T')[0], booking?.checkout?.toISOString().split('T')[0]);
   const pricePerNight = (hotel?.highRate - hotel?.lowRate) / 2; 
   return (
      <div
         className={` p-4 rounded-md ${
            fromPastBooking ? 'bg-[#F6F3E9]' : 'bg-[#ebf6e9]'
         }`}
      >
         <div className="flex justify-between items-center ">
            <div className="flex flex-col justify-between">
               <h3 className="text-xl font-semibold">{hotel?.name}</h3>
               <div className="text-sm text-gray-600 my-4">
                  <p>Check In: {booking.checkin.toISOString().split('T')[0]}</p>
                  <p>
                     Check Out: {booking.checkout.toISOString().split('T')[0]}
                  </p>
               </div>
            </div>
            <div>
               <h3 className="text-xl font-semibold text-right">
                  ${(pricePerNight * duration).toFixed(2)}
               </h3>
               <p className="text-sm text-gray-600">
                  ${pricePerNight.toFixed(2)} per night x {duration} days
               </p>
            </div>
         </div>
      </div>
   );
}
