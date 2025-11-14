import ProfileInfo from '@/components/user/ProfileInfo';
import PastBooking from '@/components/user/booking/PastBooking';
import UpcomingBooking from '@/components/user/booking/UpcomingBooking';
import { auth } from '@/lib/auth';
import { getBookings } from '@/utils/queries';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
   title: 'Bookings',
   description: 'Manage your hotel bookings with StaySwift',
};

const BookingsPage = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   if (!session?.user) {
      redirect('/login');
   }
   const { data: bookings } = await getBookings(session?.user?.id);
   console.log(bookings);
   return (
      <>
         <section className="mt-[100px]">
            <div className="container">
               <ProfileInfo />
            </div>
         </section>
         <section>
            <div className="container">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <PastBooking bookings={bookings?.pastBookings ?? []} />
                  <UpcomingBooking bookings={bookings?.upcomingBookings ?? []} />
               </div>
            </div>
         </section>
      </>
   );
};

export default BookingsPage;
