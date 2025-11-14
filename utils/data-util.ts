import { Hotel, Rating } from '@/db/models';
import { Booking } from '@/types/types';

// Synchronous utility – no async/await needed here
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

export const isDateBetween = (date: string, start: string, end: string) => {
   // console.log(date, start, end);
   const d = new Date(date);
   const s = new Date(start);
   const e = new Date(end);
   return d >= s && d <= e;
};

export const getDayDifference = (start: string, end: string) => {
   const startDate = new Date(start);
   const endDate = new Date(end);
   const timeDiff = endDate.getTime() - startDate.getTime();
   const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
   return dayDiff + 1;
};

export const differentiateBookings = (bookings: Booking[]) => {
   const today = new Date();
   today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

   const pastBookings = bookings.filter((booking: Booking) => {
      const checkoutDate = new Date(booking.checkout);
      checkoutDate.setHours(0, 0, 0, 0);
      return checkoutDate < today;
   });

   const upcomingBookings = bookings.filter((booking: Booking) => {
      const checkoutDate = new Date(booking.checkout);
      checkoutDate.setHours(0, 0, 0, 0);
      return checkoutDate >= today;
   });
   
   pastBookings.sort((a, b) => {
      return new Date(b.checkin).getTime() - new Date(a.checkin).getTime();
   });

   upcomingBookings.sort((a, b) => {
      return new Date(a.checkin).getTime() - new Date(b.checkin).getTime();
   });

   return { pastBookings, upcomingBookings };
};
