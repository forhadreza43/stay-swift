import { getRatings } from "@/utils/data-util";

export default async function HotelRatings({ hotelId }: { hotelId: string }) {
   const result = await getRatings(hotelId);
   

   const ratings = result?.data ?? 0;

   let ratingDescription = "";
   if(ratings === 0){
      ratingDescription = "No Ratings";
   }
   else if(ratings > 0 && ratings < 2){
      ratingDescription = "Poor";
   }
   else if(ratings >= 2 && ratings < 4){
      ratingDescription = "Average";
   }
   else if(ratings >= 4 && ratings < 5){
      ratingDescription = "Very Good";
   }
   else if(ratings === 5){
      ratingDescription = "Excellent";
   }

   return (
      <>
         <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
            <span>{ratings}</span>
         </div>
         <span className="font-medium">{ratingDescription}</span>
      </>
   );
}
