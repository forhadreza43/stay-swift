import { Hotel, Rating, Review, User, connectDB } from '@/db/models';
import { replaceMongoIdInArray, replaceMongoIdInObject } from './data-util';
// Server-side data fetching function for hotels
export const getHotels = async (params: {
   destination?: string;
   checkIn?: string;
   checkOut?: string;
}) => {
   try {
      await connectDB();
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
      await connectDB();
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
      } else if (modifiedRatings?.length === 1) {
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

export const getHotelById = async (hotelId: string) => {
   try {
      await connectDB();
      if (!hotelId) return { error: 'Missing hotelId', status: 400 };
      const hotel = await Hotel.findById(hotelId)
         .select([
            'thumbNailUrl',
            'name',
            'highRate',
            'lowRate',
            'city',
            'propertyCategory',
            'gallery',
            'overview',
         ])
         .lean();
      if (!hotel) return { error: 'Hotel not found', status: 404 };
      const modifiedHotel = replaceMongoIdInObject(hotel);
      return { data: modifiedHotel, status: 200 };
   } catch (err) {
      console.error('getHotelById error:', err);
      return { error: 'Internal Server Error', status: 500 };
   }
};

export const getReviews = async (hotelId: string) => {
   try {
      await connectDB();
      if (!hotelId) return { error: 'Missing hotelId', status: 400 };
      const reviews = await Review.find({ hotelId }).lean();
      const modifiedReviews = replaceMongoIdInArray(reviews);
      return { data: modifiedReviews, status: 200 };
   } catch (err) {
      console.error('getReviews error:', err);
      return { error: 'Internal Server Error', status: 500 };
   }
};

export const getUser = async (userId: string) => {
   try {
      await connectDB();
      if (!userId) return { error: 'Missing userId', status: 400 };
      const user = await User.findById(userId).lean();
      if (!user) return { error: 'User not found', status: 404 };
      const modifiedUser = replaceMongoIdInObject(user);
      return { data: modifiedUser, status: 200 };
   } catch (err) {
      console.error('getUser error:', err);
      return { error: 'Internal Server Error', status: 500 };
   }
};
