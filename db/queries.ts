import { replaceMongoIdInArray } from '@/utils/data-util';
import { Hotel } from './models';

const getAllHotels = async () => {
   const hotels = await Hotel.find().lean();
   return replaceMongoIdInArray(hotels);
   // return hotels;
};

export { getAllHotels };
