import { Hotel } from '@/types/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import HotelRatings from './HotelRatings';
import HotelReviews from './HotelReviews';

const HotelSummaryInfo = ({
   fromListPage,
   hotel,
}: {
   fromListPage: boolean;
   hotel: Hotel;
}) => {
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
               <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
                  <HotelRatings hotelId={hotel?.id} />
               </div>
               <span className="font-medium">Very Good</span>
               <span>|</span>
               <HotelReviews hotelId={hotel?.id} />
            </div>
            <div>
               <span className="text-sm bg-yellow-400 rounded-full px-3 py-1.5">
                  {hotel?.propertyCategory} Star Property
               </span>
            </div>
         </div>

         <div className="flex flex-col gap-2 items-end justify-center">
            <h2 className="text-2xl font-bold text-right">
               ${(hotel?.lowRate + hotel?.highRate) / 2}/night
            </h2>
            <p className=" text-right">Per Night for 1 Rooms</p>
            {fromListPage ? (
               <Link href={`/hotels/${hotel.id}`}>
                  <Button className="hover:rounded-full">Details</Button>
               </Link>
            ) : (
               <Button className="btn-primary ">Book</Button>
            )}
         </div>
      </>
   );
};

export default HotelSummaryInfo;
