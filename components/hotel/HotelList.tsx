import { Hotel } from '@/types/types';
import HotelCard from './HotelCard';

const HotelList = async () => {
   const { data: hotels } = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getHotels`
   ).then((res) => res.json());
   return (
      <div className="col-span-9">
         <div className="space-y-4">
            {hotels.map((hotel: Hotel) => (
               <HotelCard key={hotel.id} hotel={hotel} />
            ))}
         </div>
      </div>
   );
};

export default HotelList;
