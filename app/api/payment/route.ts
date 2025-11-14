import { Booking, connectDB } from '@/db/models';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   try {
      await connectDB();
      const {hotelId,userId, checkIn, checkOut} = await request.json();
      const payLoad = {
         hotelId: new mongoose.Types.ObjectId(hotelId),
         userId: new mongoose.Types.ObjectId(userId),
         checkin: new Date(checkIn),
         checkout: new Date(checkOut),
      }
      // console.log('Payment Info:', payLoad);
      await Booking.create(payLoad);
      return NextResponse.json(
         { message: 'Payment processed successfully' },
         { status: 200 }
      );
   } catch {
      return NextResponse.json(
         { error: 'Failed to process payment' },
         { status: 500 }
      );
   }
}
