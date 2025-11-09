import { Hotel } from '@/db/models';
import { replaceMongoIdInObject } from '@/utils/data-util';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
      const hotelId = request.nextUrl.searchParams.get('hotelId');
      // console.log(`hotelId: ${hotelId}`);
      if (!hotelId) {
         return NextResponse.json({ error: 'Missing hotelId' }, { status: 400 });
      }

      const hotel = await Hotel.findById(new Types.ObjectId(hotelId))
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
      const modifiedHotel = replaceMongoIdInObject(hotel);

      return NextResponse.json({ data: modifiedHotel, status: 200 });
   } catch {
      return NextResponse.error();
   }
}
