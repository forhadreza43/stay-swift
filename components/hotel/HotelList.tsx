import { Hotel } from '@/types/types';
import HotelCard from './HotelCard';
import { getHotels } from '@/utils/data-util';
import { SearchQuery } from '@/types/types';

const HotelList = async ({ searchQuery }: { searchQuery: SearchQuery }) => {
   const { data: hotels } = await getHotels({
      destination: searchQuery.destination,
      checkIn: searchQuery.checkIn,
      checkOut: searchQuery.checkOut,
   });

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
