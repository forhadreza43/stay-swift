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
            <SelectItem value="Puglia">Puglia</SelectItem>
            <SelectItem value="Fethiye">Fethiye</SelectItem>
            <SelectItem value="Tisvildeleje">Tisvildeleje</SelectItem>
            <SelectItem value="Calvi">Calvi</SelectItem>
            <SelectItem value="Unterwössen">Unterwössen</SelectItem>
            <SelectItem value="Kerkira">Kerkira</SelectItem>
            <SelectItem value="Perpignan">Perpignan</SelectItem>
            <SelectItem value="Bromskirchen">Bromskirchen</SelectItem>
            <SelectItem value="West Midlands">West Midlands</SelectItem>
            <SelectItem value="Greater London">Greater London</SelectItem>
            <SelectItem value="Le Pré-Saint-Gervais">
               Le Pré-Saint-Gervais
            </SelectItem>
            <SelectItem value="London">London</SelectItem>
            <SelectItem value="Catania">Catania</SelectItem>
            <SelectItem value="Paris">Paris</SelectItem>
            <SelectItem value="Gokceovacık">Gokceovacık</SelectItem>
            <SelectItem value="Pornichet">Pornichet</SelectItem>
            <SelectItem value="Putzbrunn">Putzbrunn</SelectItem>
            <SelectItem value="Frejus">Frejus</SelectItem>
            <SelectItem value="Saint-Denis">Saint-Denis</SelectItem>
            <SelectItem value="Kadıköy">Kadıköy</SelectItem>
            <SelectItem value="Karlovasi">Karlovasi</SelectItem>
            <SelectItem value="Fatih">Fatih</SelectItem>
            <SelectItem value="Portsmouth">Portsmouth</SelectItem>
            <SelectItem value="Cergy">Cergy</SelectItem>
         </SelectContent>
      </Select>
   );
}
