import { Hotel, Rating } from '@/db/models';


export const replaceMongoIdInArray = (array: any[]) => {
   const mappedArray = array.map((item) => {
      const converted: any = {
         id: item._id.toString(),
         ...item,
      };

      // Convert ObjectId fields to strings
      if (item.userId && typeof item.userId.toString === 'function') {
         converted.userId = item.userId.toString();
      }
      if (item.hotelId && typeof item.hotelId.toString === 'function') {
         converted.hotelId = item.hotelId.toString();
      }

      const { _id, ...rest } = converted;
      return rest;
   });

   return mappedArray;
};

export const replaceMongoIdInObject = (obj: any) => {
   const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
   return updatedObj;
};

// Server-side data fetching function for hotels
export const getHotels = async (params: {
   destination?: string;
   checkIn?: string;
   checkOut?: string;
}) => {
   try {
      const { destination, checkIn, checkOut } = params;

      // Build dynamic query filter
      const filter: Record<string, unknown> = {};
      if (destination) {
         // Case-insensitive search for destination in city field
         filter.city = new RegExp(destination, 'i');
      }

      const hotels = await Hotel.find(filter)
         .select([
            'thumbNailUrl',
            'name',
            'highRate',
            'lowRate',
            'city',
            'propertyCategory',
         ])
         .lean();

      const modifiedHotels = replaceMongoIdInArray(hotels);

      return {
         data: modifiedHotels,
         filters: { destination, checkIn, checkOut },
      };
   } catch (err) {
      console.error('getHotels error:', err);
      throw new Error('Failed to fetch hotels');
   }
};

export const getRatings = async (hotelId: string) => {
   try {
      // console.log(`hotelId: ${hotelId}`);
      if (!hotelId) {
         return {
            error: 'Missing hotelId',
            status: 400,
         };
      }

      const ratings = await Rating.find({ hotelId: hotelId }).lean();
      const modifiedRatings = replaceMongoIdInArray(ratings);
      // console.log(modifiedRatings);

      if (Array.isArray(modifiedRatings) && modifiedRatings.length > 1) {
         const sum = modifiedRatings.reduce((acc, r) => {
            const val =
               typeof r.rating === 'number'
                  ? r.rating
                  : parseFloat(String(r.rating)) || 0;
            return acc + val;
         }, 0);
         const average = Number((sum / modifiedRatings.length).toFixed(2));
         return { data: average, status: 200 };
      } else if (modifiedRatings.length === 1) {
         return {
            data: modifiedRatings[0].rating,
            status: 200,
         };
      } else if (modifiedRatings.length === 0) {
         return { data: 0, status: 200 };
      }

   } catch (err) {
      console.error('getRatings error:', err);
      return {
         error: 'Internal Server Error',
         status: 500,
      };
   }
};
