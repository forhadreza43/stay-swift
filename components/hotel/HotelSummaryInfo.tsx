import { Hotel } from '@/types/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import HotelRatings from './HotelRatings';
import HotelReviews from './HotelReviews';

const HotelSummaryInfo = ({
   fromListPage,
   hotel,
   checkIn,
   checkOut,
}: {
   fromListPage: boolean;
   hotel: Hotel;
   checkIn: string;
   checkOut: string;
}) => {
   let params = '';
   if (checkIn && checkOut) {
      params = `?checkIn=${checkIn}&checkOut=${checkOut}`;
   }
   return (
      <>
         <div className={fromListPage ? 'flex-1' : 'flex-1 container'}>
            <h2
               className={
                  fromListPage ? 'font-bold text-lg' : 'font-bold text-2xl'
               }
            >
               {hotel?.name}
            </h2>
            <p className="flex  items-center gap-2">
               <MapPin size={18} /> <span>{hotel?.city}</span>
            </p>
            <div className="flex gap-2 items-center my-4">
               <HotelRatings hotelId={hotel?.id} />
               <span>|</span>
               <HotelReviews hotelId={hotel?.id} />
            </div>
            <div className="flex items-center gap-2">
               <span className="text-sm bg-yellow-400 rounded-full px-3 py-1.5">
                  {hotel?.propertyCategory} Star Property
               </span>
               {hotel?.isBooked && (
                  <span className="text-sm bg-red-300 rounded-full px-3 py-1.5">
                     Booked
                  </span>
               )}
            </div>
         </div>

         <div className="flex flex-col gap-2 items-end justify-center">
            <h2 className="text-2xl font-bold text-right">
               ${(hotel?.lowRate + hotel?.highRate) / 2}/night
            </h2>
            <p className=" text-right">Per Night for 1 Rooms</p>
            {fromListPage ? (
               <Link href={`/hotels/${hotel.id}${params}`}>
                  <Button className="hover:rounded-full">Details</Button>
               </Link>
            ) : (
               <Link href={`/hotels/${hotel?.id}/payment${params}`}>
                  <Button
                     className={`btn-primary hover:rounded-full ${
                        hotel?.isBooked ? 'cursor-not-allowed' : ''
                     }`}
                     disabled={hotel?.isBooked}
                  >
                     Book
                  </Button>
               </Link>
            )}
         </div>
      </>
   );
};

export default HotelSummaryInfo;
