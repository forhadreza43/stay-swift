import { connectDB, Hotel } from '@/db/models';
import { replaceMongoIdInArray } from '@/utils/data-util';
import { NextResponse } from 'next/server';

export async function GET() {
   try {
      await connectDB();
      // const hotels = await getAllHotels();
      const hotels = await Hotel.find()
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

      return NextResponse.json({ data: modifiedHotels, status: 200 });
   } catch (err) {
      console.error('GET /api/getHotels error:', err);
      return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
      );
   }
}
