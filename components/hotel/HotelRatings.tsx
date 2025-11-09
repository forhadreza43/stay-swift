export default async function HotelRatings({ hotelId }: { hotelId: string }) {
   const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getRatings?hotelId=${hotelId}`
   ).then((res) => res.json());

   const ratings = data || 0;

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
            <span>{data || 0}</span>
         </div>
         <span className="font-medium">{ratingDescription}</span>
      </>
   );
}
