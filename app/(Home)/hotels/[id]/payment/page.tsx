import PaymentForm from '@/components/payment/PaymentForm';
import { getDayDifference } from '@/utils/data-util';
import { getHotelById } from '@/utils/queries';

const PaymentPage = async ({
   params,
   searchParams,
}: {
   params: Promise<{ id: string }>;
   searchParams?: Promise<{ checkIn?: string; checkOut?: string }>;
}) => {
   const { id: hotelId } = await params;
   const { data: hotel } = await getHotelById(hotelId);
   const urlParams = await searchParams;
   const checkIn = urlParams?.checkIn as string | undefined;
   const checkOut = urlParams?.checkOut as string | undefined;
   // console.log(checkIn, checkOut);
   // console.log(hotelId, hotel);
   const hasCheckInCheckOut = checkIn && checkOut;
   let dayCount = 1;
   if (hasCheckInCheckOut) {
      const timeDiff = getDayDifference(checkIn, checkOut);
      dayCount = timeDiff;
   }
   console.log(dayCount);
   return (
      <section className="container">
         <div className="md:p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
            <h2 className="font-bold text-xl md:text-2xl">Payment Details</h2>
            <p className="text-gray-600 text-sm">
               You have picked <b>{hotel?.name}</b> and total price is{' '}
               <b>${(((hotel?.highRate + hotel?.lowRate) / 2) * dayCount).toFixed(2)}</b> for {dayCount} day{dayCount > 1 ? 's' : ''}.
            </p>
            <PaymentForm hotel={hotel} checkIn={checkIn} checkOut={checkOut} />
         </div>
      </section>
   );
};

export default PaymentPage;
