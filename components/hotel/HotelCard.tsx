import { Hotel } from '@/types/types';
import HotelSummaryInfo from './HotelSummaryInfo';
import Image from 'next/image';

const HotelCard = ({
   hotel,
   checkIn,
   checkOut,
}: {
   hotel: Hotel;
   checkIn: string;
   checkOut: string;
}) => {
   //  console.log(hotel);
   return (
      <div className="flex flex-col lg:flex-row gap-6 border border-gray/20 p-4 rounded-md w-full">
         <Image
            src={hotel?.thumbNailUrl}
            className="max-h-[162px] max-w-60"
            alt={hotel?.name}
            width={800}
            height={500}
         />
         <HotelSummaryInfo
            fromListPage={true}
            hotel={hotel}
            checkIn={checkIn}
            checkOut={checkOut}
         />
      </div>
   );
};

export default HotelCard;
