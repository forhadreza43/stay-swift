import { Hotel } from '@/types/types';
import HotelSummaryInfo from '../HotelSummaryInfo';

const Summary = async ({
   hotel,
   checkIn,
   checkOut,
}: {
   hotel: Hotel;
   checkIn?: string;
   checkOut?: string;
}) => {
   // console.log('first', params);
   return (
      <section className="py-4 mt-[100px] ">
         <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <HotelSummaryInfo
               fromListPage={false}
               hotel={hotel}
               checkIn={checkIn as string}
               checkOut={checkOut as string}
            />
         </div>
      </section>
   );
};

export default Summary;
