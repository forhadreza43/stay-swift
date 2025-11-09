import Link from "next/link";

export default async function HotelReviews({ hotelId }: { hotelId: string }) {
   const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getReviews?hotelId=${hotelId}`
   ).then((res) => res.json());
   // console.log(data);
   return <>{
      data?.length === 0? (<Link href="#" className="underline">Be the first to reviewer</Link>):(<Link href={`/hotels/${hotelId}/reviews`} className="underline">{data?.length} Reviews</Link>)
   }</>;
}
