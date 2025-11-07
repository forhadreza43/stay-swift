import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import DatePicker from '../DatePicker';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
const Search = ({ fromList }: { fromList: boolean }) => {
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
                  {/* <h4 className="mt-2">
                     <select name="destination" id="destination">
                        <option value="Bali">Bali</option>
                        <option value="Bali">Coxs Bazar</option>
                        <option value="Bali">Sylhet</option>
                        <option value="Bali">Saint Martin</option>
                        <option value="Bali">Bali</option>
                     </select>
                  </h4> */}
                  
                  <Select name="destination">
                     <SelectTrigger className="w-full">
                        <SelectValue
                           className="font-normal"
                           placeholder="Select a destination"
                        />
                     </SelectTrigger>
                     <SelectContent >
                        <SelectItem value="Bali">Bali</SelectItem>
                        <SelectItem value="Coxs Bazar">Coxs Bazar</SelectItem>
                        <SelectItem value="blueberry">sylhet</SelectItem>
                        <SelectItem value="grapes">Saint Martin</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div>
                  {/* <span>Check in</span> */}
                  <h4 className="mt-2">
                     {/* <Input type="date" name="checkin" id="checkin" /> */}
                     <DatePicker title={'Check in'} />
                  </h4>
               </div>

               <div>
                  {/* <span>Checkout</span> */}
                  <h4 className="mt-2">
                     {/* <Input type="date" name="checkout" id="checkout" /> */}
                     <DatePicker title={'Checkout'} />
                  </h4>
               </div>
            </div>
         </div>

         <Button className="search-btn">
            🔍️ {fromList ? 'Modify Search' : 'Search'}
         </Button>
      </>
   );
};

export default Search;
