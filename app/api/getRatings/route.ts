import { Rating } from '@/db/models';
import { replaceMongoIdInArray } from '@/utils/data-util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
      const hotelId = request.nextUrl.searchParams.get('hotelId');
      // console.log(`hotelId: ${hotelId}`);
      if (!hotelId) {
         return NextResponse.json(
            { error: 'Missing hotelId' },
            { status: 400 }
         );
      }

      const ratings = await Rating.find({ hotelId: hotelId }).lean();
      const modifiedRatings = replaceMongoIdInArray(ratings);
      // console.log(modifiedRatings);

      if (Array.isArray(modifiedRatings) && modifiedRatings.length > 1) {
         const sum = modifiedRatings.reduce((acc, r) => {
            const val = typeof r.rating === 'number' ? r.rating : parseFloat(String(r.rating)) || 0;
            return acc + val;
         }, 0);
         const average = Number((sum / modifiedRatings.length).toFixed(2));
         return NextResponse.json({ data: average, status: 200 });
      }
      else if (modifiedRatings.length === 1) {
         return NextResponse.json({ data: modifiedRatings[0].rating, status: 200 });
      }
      else if (modifiedRatings.length === 0) {
         return NextResponse.json({ data: 0, status: 200 });
      }

      // return NextResponse.json({ data: modifiedRatings[0].rating, status: 200 });
   } catch (err) {
      console.error('GET /api/getRatings error:', err);
      return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
      );
   }
}
