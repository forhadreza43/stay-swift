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

