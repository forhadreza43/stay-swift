import { Booking, Hotel, Rating, Review, User, connectDB } from '@/db/models';
import {
   isDateBetween,
   replaceMongoIdInArray,
   replaceMongoIdInObject,
} from './data-util';

interface GetHotels {
   _id?: string;
   name: string;
   city: string;
   highRate: number;
   lowRate: number;
   propertyCategory?: number;
   thumbNailUrl: string;
}

// Server-side data fetching function for hotels
export const getHotels = async (params: {
   destination?: string;
   checkIn?: string;
   checkOut?: string;
   priceRange?: string;
   stars?: string;
   amenities?: string;
   sort?: string;
}) => {
   try {
      await connectDB();
      const {
         destination,
         checkIn,
         checkOut,
         priceRange,
         stars,
         amenities,
         sort,
      } = params;

      // Build dynamic query filter
      const filter: Record<string, unknown> = {};
      if (destination) {
         // Case-insensitive search for destination in city field
         filter.city = new RegExp(destination, 'i');
      }

      // Price range filter
      if (priceRange) {
         const ranges = priceRange.split(',');
         // [{ lowRate: { $gte: 30, $lte: 60 } }];
         const priceConditions: { lowRate: { $gte: number; $lte?: number } }[] =
            [];

         ranges.forEach((range) => {
            const [min, max] = range.split('-').map(Number);
            if (max === 999) {
               // Handle 182+ case
               priceConditions.push({ lowRate: { $gte: min } });
            } else {
               priceConditions.push({
                  lowRate: { $gte: min, $lte: max },
               });
            }
         });

         // console.log(priceConditions);

         if (priceConditions.length > 0) {
            filter.$or = priceConditions;
         }
         // console.log(priceConditions);
      }

      // Star category filter
      if (stars) {
         const starCategories = stars.split(',').map(Number);
         filter.propertyCategory = { $in: starCategories };
      }

      // Amenities filter (if you have amenities in hotel schema)
      if (amenities) {
         const amenitiesList = amenities.split(',');
         filter.amenities = { $all: amenitiesList };
      }

      let query = Hotel.find(filter).select([
         'thumbNailUrl',
         'name',
         'highRate',
         'lowRate',
         'city',
         'propertyCategory',
      ]);

      // Sorting
      if (sort === 'highToLow') {
         query = query.sort({ lowRate: -1 });
      } else if (sort === 'lowToHigh') {
         query = query.sort({ lowRate: 1 });
      }

      const hotels = (await query.lean()) as any[];
      // console.log(hotels);

      if (checkIn && checkOut) {
         const filteredHotels = await Promise.all(
            hotels.map(async (hotel) => {
               const hotelWithBooking = hotel as any;
               const found = await findBooking(
                  String(hotel._id),
                  checkIn || '',
                  checkOut || ''
               );
               // console.log("From all:",found, hotel._id);
               if (found) {
                  hotelWithBooking.isBooked = true;
               } else {
                  hotelWithBooking.isBooked = false;
               }
               return hotelWithBooking;
            })
         );
         const modifiedHotels = replaceMongoIdInArray(filteredHotels);

         return {
            data: modifiedHotels,
            filters: {
               destination,
               checkIn,
               checkOut,
               priceRange,
               stars,
               amenities,
               sort,
            },
         };
      }

      const modifiedHotels = replaceMongoIdInArray(hotels);

      return {
         data: modifiedHotels,
         filters: {
            destination,
            checkIn,
            checkOut,
            priceRange,
            stars,
            amenities,
            sort,
         },
      };
   } catch (err) {
      console.error('getHotels error:', err);
      throw new Error('Failed to fetch hotels');
   }
};

export const findBooking = async (
   hotelId: string,
   checkin: string,
   checkout: string
) => {
   try {
      await connectDB();
      if (!hotelId || !checkin || !checkout) {
         return { error: 'Missing parameters', status: 400 };
      }

      const matches = await Booking.find({
         hotelId,
      }).lean();

      const found = matches.find((match) => {
         return (
            isDateBetween(
               checkin,
               match.checkin.toISOString().split('T')[0],
               match.checkout.toISOString().split('T')[0]
            ) ||
            isDateBetween(
               checkout,
               match.checkin.toISOString().split('T')[0],
               match.checkout.toISOString().split('T')[0]
            )
         );
      });

      return found ? true : false;
   } catch (err) {
      console.error('getBooking error:', err);
      return { error: 'Internal Server Error', status: 500 };
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

interface HotelById {
   _id?: string;
   thumbNailUrl?: string;
   name?: string;
   highRate?: number;
   lowRate?: number;
   city?: string;
   propertyCategory?: number;
   gallery?: string[];
   overview?: string;
   isBooked?: boolean;
}

export const getHotelById = async (
   hotelId: string,
   checkIn?: string,
   checkOut?: string
) => {
   try {
      await connectDB();
      if (!hotelId) return { error: 'Missing hotelId', status: 400 };
      const hotel = (await Hotel.findById(hotelId)
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
         .lean()) as HotelById;
      if (!hotel) return { error: 'Hotel not found', status: 404 };
      if (checkIn && checkOut) {
         const hotelWithBooking = hotel as HotelById;
         const found = await findBooking(String(hotel?._id), checkIn, checkOut);
         if (found) {
            hotelWithBooking.isBooked = true;
         } else {
            hotelWithBooking.isBooked = false;
         }
         const modifiedHotel = replaceMongoIdInObject(hotelWithBooking);
         return { data: modifiedHotel, status: 200 };
      }
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
