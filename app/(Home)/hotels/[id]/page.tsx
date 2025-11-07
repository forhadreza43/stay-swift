import Summary from '@/components/hotel/details/Summary';
import Gallery from '@/components/hotel/details/Gallery';
import Overview from '@/components/hotel/details/Overview';

const HotelDetailsPage = async ({
   params,
}: {
   params: Promise<{ id: string }>;
}) => {
   const { id: hotelId } = await params;
   const { data: hotel } = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/hotelById?hotelId=${hotelId}`
   ).then((res) => res.json());
   // console.log(hotel);
   return (
      <>
         <Summary hotel={hotel} />
         <Gallery gallery={hotel?.gallery} />
         <Overview shortDescription={hotel?.shortDescription} />
      </>
   );
};

export default HotelDetailsPage;
