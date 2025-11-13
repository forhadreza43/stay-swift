import { Hotel } from '@/db/models';

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
