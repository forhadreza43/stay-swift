export default async function HotelReviews({ hotelId }: { hotelId: string }) {
   const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getReviews?hotelId=${hotelId}`
   ).then((res) => res.json());
   // console.log(data);
   return <span>{data?.length} Reviews</span>;
}
