import Search from '@/components/search/Search';
import Filter from '@/components/search/Filter';
import HotelList from '@/components/hotel/HotelList';
import { Metadata } from 'next';
import { SearchQuery } from '@/types/types';

export const metadata: Metadata = {
   title: 'Explore Hotels',
   description: 'Browse and discover hotels with StaySwift',
};
const HotelListPage = async ({
   searchParams,
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
   const params = await searchParams;
   const searchQuery:SearchQuery = {
      checkIn: '',
      checkOut: '',
      destination: '',
   };
   if (params) {
      searchQuery.checkIn = params.checkIn as string || '';
      searchQuery.checkOut = params.checkOut as string || '';
      searchQuery.destination = params.destination as string || '';
   }
   // console.log(params);
   // console.log(
   //    'From Hotel List:',
   //    search.checkIn,
   //    search.checkOut,
   //    search.destination
   // );

   return (
      <>
         <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
            <div className="container items-center py-12 ">
               <Search fromList={true} />
            </div>
         </section>
         <section className="py-12">
            <div className="container grid grid-cols-12">
               <Filter />
               <HotelList searchQuery={searchQuery} />
            </div>
         </section>
      </>
   );
};

export default HotelListPage;
