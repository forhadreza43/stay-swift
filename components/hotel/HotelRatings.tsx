export default async function HotelRatings({ hotelId }: { hotelId: string }) {
   const {data} = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getRatings?hotelId=${hotelId}`
   ).then((res) => res.json());

   // console.log('data:', data);
   return <div>{data || 0}</div>;
}
