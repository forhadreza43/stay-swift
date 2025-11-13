'use client';

import DatePicker from './DatePicker';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Destination from './Destination';
import { useState, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = ({ fromList }: { fromList: boolean }) => {
   const pathName = usePathname();
   const { replace } = useRouter();
   const searchParams = useSearchParams();

   // Initialize state from URL params
   const initialDestination = searchParams.get('destination') || '';

   const initialCheckIn = (() => {
      const param = searchParams.get('checkIn');
      if (!param) return undefined;
      const parsed = new Date(param);
      return isNaN(parsed.getTime()) ? undefined : parsed;
   })();

   const initialCheckOut = (() => {
      const param = searchParams.get('checkOut');
      if (!param) return undefined;
      const parsed = new Date(param);
      return isNaN(parsed.getTime()) ? undefined : parsed;
   })();

   const [destination, setDestination] = useState<string>(initialDestination);
   const [checkInDate, setCheckInDate] = useState<Date | undefined>(
      initialCheckIn
   );
   const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
      initialCheckOut
   );

   const allowSearch = useMemo(() => {
      if (!destination) return false;
      if (checkInDate && !checkOutDate) return false;
      if (!checkInDate && checkOutDate) return false;
      if (checkInDate && checkOutDate) {
         if (checkInDate.getTime() === checkOutDate.getTime()) return false;
         if (checkInDate.getTime() > checkOutDate.getTime()) return false;
      }
      return true;
   }, [destination, checkInDate, checkOutDate]);

   const handleSearch = () => {
      if (!allowSearch) return;
      const params = new URLSearchParams(searchParams);
      params.set('destination', destination);
      if (checkInDate && checkOutDate) {
         // Use local date formatting to avoid timezone offset issues
         const formatLocalDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
         };
         params.set('checkIn', formatLocalDate(checkInDate));
         params.set('checkOut', formatLocalDate(checkOutDate));
      }
      if (pathName.includes('hotels')) {
         replace(`${pathName}?${params.toString()}`);
      } else {
         replace(`${pathName}hotels?${params.toString()}`);
      }
   };

   // console.log(
   //    destination,
   //    checkInDate?.toISOString(),
   //    checkOutDate?.toISOString()
   // );
   return (
      <>
         <div className="lg:max-h-[250px] mt-6">
            <div
               id="searchParams"
               className={(fromList && 'shadow-none!') || ''}
            >
               <div className="flex flex-col gap-3">
                  <Label
                     htmlFor="destination"
                     className="px-1 font-bold text-md mt-1.5"
                  >
                     Destination
                  </Label>

                  <Destination
                     setDestination={setDestination}
                     searchParams={searchParams}
                  />
               </div>

               <div>
                  {/* <span>Check in</span> */}
                  <h4 className="mt-2">
                     {/* <Input type="date" name="checkin" id="checkin" /> */}
                     <DatePicker
                        title={'Check in'}
                        value={checkInDate}
                        onChange={setCheckInDate}
                     />
                  </h4>
               </div>

               <div>
                  {/* <span>Checkout</span> */}
                  <h4 className="mt-2">
                     {/* <Input type="date" name="checkout" id="checkout" /> */}
                     <DatePicker
                        title={'Checkout'}
                        value={checkOutDate}
                        onChange={setCheckOutDate}
                     />
                  </h4>
               </div>
            </div>
         </div>

         <Button
            className="search-btn disabled:opacity-100 disabled:cursor-not-allowed"
            disabled={!allowSearch}
            onClick={handleSearch}
         >
            🔍️ {fromList ? 'Modify Search' : 'Search'}
         </Button>
      </>
   );
};

export default Search;
