'use client';
// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import DatePicker from '../search/DatePicker';
import { Hotel } from '@/types/types';

import { useId } from 'react';
import { CreditCardIcon } from 'lucide-react';
import { usePaymentInputs } from 'react-payment-inputs';
import images, { type CardImages } from 'react-payment-inputs/images';
import { getDayDifference } from '@/utils/data-util';
import { toast } from 'sonner';

const PaymentForm = ({
   hotel,
   checkIn,
   checkOut,
}: {
   hotel: Hotel;
   checkIn?: string;
   checkOut?: string;
}) => {
   const { data: session } = authClient.useSession();
   if (!session) {
      redirect('/login');
   }

   const [checkInDate, setCheckInDate] = useState<Date | undefined>(
      checkIn ? new Date(checkIn) : undefined
   );
   const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
      checkOut ? new Date(checkOut) : undefined
   );
   // console.log(checkIn, checkOut);

   const id = useId();
   const {
      meta,
      getCardNumberProps,
      getExpiryDateProps,
      getCVCProps,
      getCardImageProps,
   } = usePaymentInputs();

   const router = useRouter();
   const [error, setError] = useState<string | null>(null);

   let dayCount = 1;
   if (checkInDate && checkOutDate) {
      const timeDiff = getDayDifference(
         checkInDate.toISOString().split('T')[0],
         checkOutDate.toISOString().split('T')[0]
      );
      dayCount = timeDiff;
   }
   const rate = (((hotel?.highRate + hotel?.lowRate) / 2) * dayCount).toFixed(
      2
   );
   // const rate = (hotel?.highRate + hotel?.lowRate) / 2;
   const handlePayment = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         // Add payment handling logic here
         const formData = new FormData(e.target as HTMLFormElement);
         const name = formData.get('name');
         const email = formData.get('email');
         const card = formData.get('card');
         const expiry = formData.get('expiry');
         const cvv = formData.get('cvv');
         // const rate = (hotel?.highRate + hotel?.lowRate) / 2;
         const PaymentInfo = {
            name,
            email,
            card,
            expiry,
            cvv,
            checkIn: checkInDate?.toISOString().split('T')[0],
            checkOut: checkOutDate?.toISOString().split('T')[0],
            amount: rate,
            hotelId: hotel?.id,
            userId: session?.user?.id,
         };
         // console.log(PaymentInfo);
         const res = await fetch('/api/payment', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(PaymentInfo),
         });
         if (res.status === 200) {
            setError(null);
            router.push('/bookings');
            toast.success('Payment processed successfully');
         } else {
            setError('Failed to process payment');
            toast.error('Failed to process payment');
         }
      } catch (error) {
         setError('An unexpected error occurred');
         toast.error('An unexpected error occurred');
      }
   };

   return (
      <form className="my-8" onSubmit={handlePayment}>
         <div className="my-4 space-y-2">
            <Label htmlFor="name" className="block">
               Name
            </Label>
            <Input
               type="text"
               id="name"
               name="name"
               className="w-full py-1 px-2 rounded-md"
               defaultValue={session?.user?.name}
               required
            />
         </div>

         <div className="my-4 space-y-2">
            <Label htmlFor="email" className="block">
               Email
            </Label>
            <Input
               type="email"
               id="email"
               name="email"
               className="w-full py-1 px-2 rounded-md"
               defaultValue={session?.user?.email}
               required
            />
         </div>

         <div className="my-4 space-y-2">
            <span>Check in</span>
            <h4 className="mt-2">
               {/* <Input type="date" name="checkin" id="checkin" /> */}
               <DatePicker
                  title={'Checkin'}
                  value={checkInDate}
                  onChange={setCheckInDate}
                  fromPaymentForm={true}
                  required={true}
               />
            </h4>
         </div>

         <div className="my-4 space-y-2">
            <span>Checkout</span>
            <h4 className="mt-2">
               {/* <Input type="date" name="checkout" id="checkout" /> */}
               <DatePicker
                  title={'Checkout'}
                  value={checkOutDate}
                  onChange={setCheckOutDate}
                  fromPaymentForm={true}
                  required={true}
               />
            </h4>
         </div>

         <div className="*:not-first:mt-2 my-4">
            <legend className="text-foreground">Card Details</legend>
            <div className="rounded-md shadow-xs">
               <div className="relative focus-within:z-10">
                  <Input
                     className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
                     {...getCardNumberProps()}
                     id={`number-${id}`}
                     name="card"
                     required
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                     {meta.cardType ? (
                        <svg
                           className="overflow-hidden rounded-sm"
                           {...getCardImageProps({
                              images: images as unknown as CardImages,
                           })}
                           width={20}
                        />
                     ) : (
                        <CreditCardIcon size={16} aria-hidden="true" />
                     )}
                  </div>
               </div>
               <div className="-mt-px flex">
                  <div className="min-w-0 flex-1 focus-within:z-10">
                     <Input
                        className="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
                        {...getExpiryDateProps()}
                        id={`expiry-${id}`}
                        name="expiry"
                        required
                     />
                  </div>
                  <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
                     <Input
                        className="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
                        {...getCVCProps()}
                        id={`cvc-${id}`}
                        name="cvv"
                        required
                     />
                  </div>
               </div>
            </div>
         </div>

         <Button type="submit" className="btn-primary w-full">
            Pay Now (${rate})
         </Button>
      </form>
   );
};

export default PaymentForm;
