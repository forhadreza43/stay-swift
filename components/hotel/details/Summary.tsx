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
         <div className="flex container">
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
