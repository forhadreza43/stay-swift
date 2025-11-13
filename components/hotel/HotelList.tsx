import { Hotel, SearchQuery } from '@/types/types';
import HotelCard from './HotelCard';

const HotelList = async ({ searchQuery }: { searchQuery: SearchQuery }) => {
   // // Build query string from searchQuery
   // const params = new URLSearchParams();
   // if (searchQuery.destination)
   //    params.set('destination', searchQuery.destination);
   // if (searchQuery.checkIn) params.set('checkIn', searchQuery.checkIn);
   // if (searchQuery.checkOut) params.set('checkOut', searchQuery.checkOut);

   const { data: hotels } = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getHotels?destination=${searchQuery.destination}&checkIn=${searchQuery.checkIn}&checkOut=${searchQuery.checkOut}`,
      {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         cache: 'no-store', 
      }
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
