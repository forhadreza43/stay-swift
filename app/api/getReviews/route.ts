import { connectDB, Review } from '@/db/models';
import { replaceMongoIdInArray } from '@/utils/data-util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
      await connectDB();
      const hotelId = request.nextUrl.searchParams.get('hotelId');
      if (!hotelId) {
         return NextResponse.json(
            { error: 'Missing hotelId' },
            { status: 400 }
         );
      }

      const reviews = await Review.find({ hotelId: hotelId }).lean();
      const modifiedReviews = replaceMongoIdInArray(reviews);
      return NextResponse.json({ data: modifiedReviews, status: 200 });
   } catch (error) {
      console.log(`GET /api/getReviews error:`, error);
      return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
      );
   }
}
