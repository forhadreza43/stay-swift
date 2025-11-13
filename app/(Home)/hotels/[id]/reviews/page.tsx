import ReviewerCard from '@/components/hotel/ReviewerCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Review } from '@/types/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getReviews } from '@/utils/queries';

export default async function ReviewPage({
   params,
}: {
   params: { id: string };
}) {
   const { id } = await params;
   const { data } = await getReviews(id);
   const reviews: Review[] = Array.isArray(data) ? data : [];
   // console.log(data);
   return (
      <div className="container pt-30">
         <div className="mb-8 flex items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold tracking-tight">
                  Guest reviews
               </h1>
               <p className="text-muted-foreground">
                  {reviews.length} review{reviews.length === 1 ? '' : 's'}
               </p>
            </div>
            <div className="flex items-center gap-2">
               <Link href={`/hotels/${id}`}>
                  <Button
                     variant="outline"
                     className="border border-primary transition-all duration-300 hover:bg-primary hover:text-white"
                  >
                     <ArrowLeft /> Back to hotel
                  </Button>
               </Link>
            </div>
         </div>

         {reviews.length === 0 ? (
            <Card>
               <CardHeader>
                  <CardTitle>No reviews yet</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-muted-foreground">
                     There are no reviews for this stay yet. Be the first to
                     share your experience.
                  </p>
               </CardContent>
            </Card>
         ) : (
            <div className="space-y-4">
               {reviews.map((review: Review) => (
                  <Card key={review.id}>
                     <ReviewerCard userId={review?.userId} />
                     <CardContent>
                        <p className="leading-relaxed text-foreground/90 whitespace-pre-line">
                           {review.review}
                        </p>
                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
      </div>
   );
}
