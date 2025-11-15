import Summary from '@/components/hotel/details/Summary';
import Gallery from '@/components/hotel/details/Gallery';
import Overview from '@/components/hotel/details/Overview';
import { Metadata } from 'next';
import { getHotelById } from '@/utils/queries';

export async function generateMetadata({
   params,
   searchParams,
}: {
   params: Promise<{ id: string }>;
   searchParams: Promise<{ checkIn?: string; checkOut?: string }>;
}): Promise<Metadata> {
   const { id: hotelId } = await params;
   const { checkIn, checkOut } = await searchParams;
   const { data: hotel } = await getHotelById(hotelId, checkIn, checkOut);
   return {
      title: hotel?.name || 'Hotel Details',
      description: hotel?.overview?.slice(0, 160) || 'Hotel information',
   };
}

const HotelDetailsPage = async ({
   params,
   searchParams,
}: {
   params: Promise<{ id: string }>;
   searchParams: Promise<{ checkIn?: string; checkOut?: string }>;
}) => {
   const { id: hotelId } = await params;
   const { checkIn, checkOut } = await searchParams;
   const { data: hotel } = await getHotelById(hotelId, checkIn, checkOut);
   // console.log(hotel);
   return (
      <>
         <Summary hotel={hotel} checkIn={checkIn} checkOut={checkOut} />
            <Gallery gallery={hotel?.gallery} />
         <section>
            <Overview overview={hotel?.overview} />
         </section>
      </>
   );
};

export default HotelDetailsPage;
