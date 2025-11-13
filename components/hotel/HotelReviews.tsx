import Link from 'next/link';
import { getReviews } from '@/utils/queries';
import { getApiUrl } from '@/lib/api-url';

export default async function HotelReviews({ hotelId }: { hotelId: string }) {
   // const { data } = await getReviews(hotelId);
   const baseUrl = await getApiUrl();
   const {data} = await fetch(`${baseUrl}/api/getReviews?hotelId=${hotelId}`).then(res => res.json());
   const count = Array.isArray(data) ? data.length : 0;
   return (
      <>
         {count === 0 ? (
            <Link href="#" className="underline">
               Be the first to reviewer
            </Link>
         ) : (
            <Link href={`/hotels/${hotelId}/reviews`} className="underline">
               {count} Reviews
            </Link>
         )}
      </>
   );
}
