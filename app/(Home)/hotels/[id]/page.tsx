import Summary from '@/components/hotel/details/Summary';
import Gallery from '@/components/hotel/details/Gallery';
import Overview from '@/components/hotel/details/Overview';
import { Metadata } from 'next';
import { getHotelById } from '@/utils/queries';

export async function generateMetadata({
   params,
}: {
   params: Promise<{ id: string }>;
}): Promise<Metadata> {
   const { id: hotelId } = await params;
   const { data: hotel } = await getHotelById(hotelId);
   return {
      title: hotel?.name || 'Hotel Details',
      description: hotel?.overview?.slice(0, 160) || 'Hotel information',
   };
}

const HotelDetailsPage = async ({
   params,
}: {
   params: Promise<{ id: string }>;
}) => {
   const { id: hotelId } = await params;
   const { data: hotel } = await getHotelById(hotelId);
   // console.log(hotel);
   return (
      <>
         <Summary hotel={hotel} />
         <Gallery gallery={hotel?.gallery} />
         <Overview overview={hotel?.overview} />
      </>
   );
};

export default HotelDetailsPage;
