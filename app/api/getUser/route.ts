import { connectDB } from '@/db/models';
import { replaceMongoIdInObject } from '@/utils/data-util';
import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
   try {
      await connectDB();
      const userId = request.nextUrl.searchParams.get('userId');
      console.log('UserID:', userId);
      if (!userId) {
         return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
      }
      if (!Types.ObjectId.isValid(userId)) {
         return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
      }
      const db = mongoose.connection.db;
      let user;
      if (db) {
         user = await db
            .collection('user')
            .findOne({ _id: new Types.ObjectId(userId) });
         console.log('User from native driver:', user);
      }
      if (!user) {
         return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      const modifiedUser = replaceMongoIdInObject(user);
      return NextResponse.json({ data: modifiedUser, status: 200 });
   } catch (error) {
      console.error('GET /api/getUser', error);
      return NextResponse.json(
         { error: 'Failed to fetch user' },
         { status: 500 }
      );
   }
}
