'use client';

import DatePicker from './DatePicker';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Destination from './Destination';
import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = ({ fromList }: { fromList: boolean }) => {
   const pathName = usePathname();
   const { replace } = useRouter();
   const searchParams = useSearchParams();
   const [loading, setLoading] = useState(false);

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

   // Reset loading when searchParams change (navigation completed)
   useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 100);
      return () => clearTimeout(timer);
   }, [searchParams]);

   const allowSearch = useMemo(() => {
      if (!destination) return false;
      if (checkInDate && !checkOutDate) return false;
      if (!checkInDate && checkOutDate) return false;
      if (checkInDate && checkOutDate) {
         if (checkInDate.getTime() === checkOutDate.getTime()) return false;
         if (checkInDate.getTime() > checkOutDate.getTime()) return false;
         if (checkInDate.getTime() < new Date().setHours(0, 0, 0, 0))
            return false;

         // if checkIn date is before today, return false
         const todayStart = new Date();
         todayStart.setHours(0, 0, 0, 0);
         if (checkInDate.getTime() < todayStart.getTime()) return false;
      }
      return true;
   }, [destination, checkInDate, checkOutDate]);

   const handleSearch = () => {
      setLoading(true);
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
            className={`search-btn disabled:opacity-100 disabled:cursor-not-allowed ${
               loading && 'cursor-wait'
            }`}
            disabled={!allowSearch}
            onClick={handleSearch}
         >
            {fromList
               ? loading
                  ? 'Searching...'
                  : 'Modify Search'
               : loading
               ? 'Searching...'
               : 'Search'}
         </Button>
      </>
   );
};

export default Search;
