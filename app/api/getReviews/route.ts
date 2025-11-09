import { Review } from '@/db/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
      const hotelId = request.nextUrl.searchParams.get('hotelId');
      if (!hotelId) {
         return NextResponse.json(
            { error: 'Missing hotelId' },
            { status: 400 }
         );
      }

      const reviews = await Review.find({ hotelId: hotelId }).lean();
      return NextResponse.json({ data: reviews, status: 200 });
   } catch (error) {
      console.log(`GET /api/getReviews error:`, error);
      return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
      );
   }
}
