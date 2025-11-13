import React from 'react';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

export default function Destination({
   setDestination,
   searchParams,
}: {
   setDestination: React.Dispatch<React.SetStateAction<string>>;
   searchParams: URLSearchParams;
}) {
   const dest = searchParams.get('destination');
   return (
      <Select
         name="destination"
         defaultValue={dest || ''}
         onValueChange={(val) => setDestination(val)}
      >
         <SelectTrigger className="w-full">
            <SelectValue
               className="font-normal"
               placeholder="Select a destination"
            />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="Bali">Bali</SelectItem>
            <SelectItem value="Coxs Bazar">Coxs Bazar</SelectItem>
            <SelectItem value="Sylhet">Sylhet</SelectItem>
            <SelectItem value="Saint Martin">Saint Martin</SelectItem>
            <SelectItem value="Dhaka">Dhaka</SelectItem>
            <SelectItem value="Chittagong">Chittagong</SelectItem>
            <SelectItem value="Khulna">Khulna</SelectItem>
            <SelectItem value="Rajshahi">Rajshahi</SelectItem>
            <SelectItem value="Barisal">Barisal</SelectItem>
            <SelectItem value="Rangpur">Rangpur</SelectItem>
         </SelectContent>
      </Select>
   );
}
