import { Hotel } from '@/types/types';
import HotelCard from './HotelCard';
import { getHotels } from '@/utils/queries';
import { SearchQuery } from '@/types/types';

const HotelList = async ({ searchQuery }: { searchQuery: SearchQuery }) => {
   const { data: hotels } = await getHotels({
      destination: searchQuery.destination,
      checkIn: searchQuery.checkIn,
      checkOut: searchQuery.checkOut,
      priceRange: searchQuery.priceRange,
      stars: searchQuery.stars,
      amenities: searchQuery.amenities,
      sort: searchQuery.sort,
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
