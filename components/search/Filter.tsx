'use client';

import CheckBox from '../hotel/CheckBox';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const Filter = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const initializedRef = useRef(false);

   // State for filters
   const [sortBy, setSortBy] = useState('');
   const [priceRanges, setPriceRanges] = useState<string[]>([]);
   const [starCategories, setStarCategories] = useState<string[]>([]);
   const [amenities, setAmenities] = useState<string[]>([]);

   // Initialize from current URL once
   useEffect(() => {
      if (initializedRef.current) return;
      const current = searchParams;
      const initSort = current.get('sort') || '';
      const initRanges = (current.get('priceRange') || '')
         .split(',')
         .filter(Boolean);
      const initStars = (current.get('stars') || '').split(',').filter(Boolean);
      const initAmenities = (current.get('amenities') || '')
         .split(',')
         .filter(Boolean);

      setSortBy(initSort);
      setPriceRanges(initRanges);
      setStarCategories(initStars);
      setAmenities(initAmenities);
      initializedRef.current = true;
   }, [searchParams]);

   // Apply filters to URL, avoid loops by comparing strings
   useEffect(() => {
      if (!initializedRef.current) return;
      const currentStr = searchParams.toString();
      const params = new URLSearchParams(currentStr);

      // Remove old filter params
      params.delete('sort');
      params.delete('priceRange');
      params.delete('stars');
      params.delete('amenities');

      // Add new filter params
      if (sortBy) params.set('sort', sortBy);
      if (priceRanges.length > 0)
         params.set('priceRange', priceRanges.join(','));
      if (starCategories.length > 0)
         params.set('stars', starCategories.join(','));
      if (amenities.length > 0) params.set('amenities', amenities.join(','));

      const nextStr = params.toString();
      if (nextStr !== currentStr) {
         router.replace(`?${nextStr}`, { scroll: false });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sortBy, priceRanges, starCategories, amenities]);

   const handleSortChange = (value: string, checked: boolean) => {
      setSortBy(checked ? value : '');
   };

   const handleArrayToggle = (
      value: string,
      checked: boolean,
      state: string[],
      setState: (value: string[]) => void
   ) => {
      if (checked) {
         setState([...state, value]);
      } else {
         setState(state.filter((item) => item !== value));
      }
   };

   return (
      <>
         <div className="col-span-3 space-y-4">
            <div>
               <h3 className="font-bold text-lg">Sort By</h3>
               <div className="flex flex-col gap-2 mt-2">
                  <CheckBox
                     id="highToLow"
                     content="Price High to Low"
                     checked={sortBy === 'highToLow'}
                     onCheckedChange={(checked) =>
                        handleSortChange('highToLow', checked)
                     }
                  />
                  <CheckBox
                     id="lowToHigh"
                     content="Price Low to High"
                     checked={sortBy === 'lowToHigh'}
                     onCheckedChange={(checked) =>
                        handleSortChange('lowToHigh', checked)
                     }
                  />
               </div>
            </div>

            <div>
               <h3 className="font-bold text-lg">Price Range</h3>
               <div className="flex flex-col gap-2 mt-2">
                  <CheckBox
                     id="range1"
                     content="$ 13 - $ 30"
                     checked={priceRanges.includes('13-30')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '13-30',
                           checked,
                           priceRanges,
                           setPriceRanges
                        )
                     }
                  />
                  <CheckBox
                     id="range2"
                     content="$ 30 - $ 60"
                     checked={priceRanges.includes('30-60')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '30-60',
                           checked,
                           priceRanges,
                           setPriceRanges
                        )
                     }
                  />
                  <CheckBox
                     id="range3"
                     content="$ 60 - $ 97"
                     checked={priceRanges.includes('60-97')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '60-97',
                           checked,
                           priceRanges,
                           setPriceRanges
                        )
                     }
                  />
                  <CheckBox
                     id="range4"
                     content="$ 97 - $ 152"
                     checked={priceRanges.includes('97-152')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '97-152',
                           checked,
                           priceRanges,
                           setPriceRanges
                        )
                     }
                  />
                  <CheckBox
                     id="range5"
                     content="$ 152 - $ 182"
                     checked={priceRanges.includes('152-182')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '152-182',
                           checked,
                           priceRanges,
                           setPriceRanges
                        )
                     }
                  />
                  <CheckBox
                     id="range6"
                     content="$ 182+"
                     checked={priceRanges.includes('182-999')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '182-999',
                           checked,
                           priceRanges,
                           setPriceRanges
                        )
                     }
                  />
               </div>
            </div>

            <div>
               <h3 className="font-bold text-lg">Star Category</h3>
               <div className="flex flex-col gap-2 mt-2">
                  <CheckBox
                     id="fiveStar"
                     content="5 Star"
                     checked={starCategories.includes('5')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '5',
                           checked,
                           starCategories,
                           setStarCategories
                        )
                     }
                  />
                  <CheckBox
                     id="fourStar"
                     content="4 Star"
                     checked={starCategories.includes('4')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '4',
                           checked,
                           starCategories,
                           setStarCategories
                        )
                     }
                  />
                  <CheckBox
                     id="threeStar"
                     content="3 Star"
                     checked={starCategories.includes('3')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '3',
                           checked,
                           starCategories,
                           setStarCategories
                        )
                     }
                  />
                  <CheckBox
                     id="twoStar"
                     content="2 Star"
                     checked={starCategories.includes('2')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '2',
                           checked,
                           starCategories,
                           setStarCategories
                        )
                     }
                  />
                  <CheckBox
                     id="oneStar"
                     content="1 Star"
                     checked={starCategories.includes('1')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           '1',
                           checked,
                           starCategories,
                           setStarCategories
                        )
                     }
                  />
               </div>
            </div>

            <div>
               <h3 className="font-bold text-lg">Amenities</h3>
               <div className="flex flex-col gap-2 mt-2">
                  <CheckBox
                     id="wifi"
                     content="Wi-fi"
                     checked={amenities.includes('wifi')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           'wifi',
                           checked,
                           amenities,
                           setAmenities
                        )
                     }
                  />
                  <CheckBox
                     id="swimmingPool"
                     content="Swimming Pool"
                     checked={amenities.includes('swimmingPool')}
                     onCheckedChange={(checked) =>
                        handleArrayToggle(
                           'swimmingPool',
                           checked,
                           amenities,
                           setAmenities
                        )
                     }
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default Filter;
