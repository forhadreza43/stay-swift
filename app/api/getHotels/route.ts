import { connectDB, Hotel } from '@/db/models';
import { replaceMongoIdInArray } from '@/utils/data-util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
      // await connectDB();

      // Extract query parameters from URL
      const searchParams = request.nextUrl.searchParams;
      const destination = searchParams.get('destination');
      const checkIn = searchParams.get('checkIn');
      const checkOut = searchParams.get('checkOut');

      // console.log(destination, checkIn, checkOut);
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

      return NextResponse.json({
         data: modifiedHotels,
         status: 200,
         filters: { destination, checkIn, checkOut }, // Optional: return applied filters
      });
   } catch (err) {
      console.error('GET /api/getHotels error:', err);
      return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
      );
   }
}
