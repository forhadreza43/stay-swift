import { Hotel } from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";

const HotelSummaryInfo = ({fromListPage, hotel}: {fromListPage: boolean, hotel: Hotel}) => {
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2 className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}>{hotel?.name}</h2>
        <p>📍 {hotel?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
            5.3
          </div>
          <span className="font-medium">Very Good</span>
          <span>|</span>
          <span>232 Reviews</span>
          <span>|</span>
          <div>
            <span>{hotel?.propertyCategory} Star Property</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">${(hotel?.lowRate + hotel?.highRate)/2}/night</h2>
        <p className=" text-right">Per Night for 1 Rooms</p>
        {
          fromListPage ? (<Link href={`/hotels/${hotel.id}`}><Button className="btn-primary ">Details</Button></Link>) : (<Button className="btn-primary ">Book</Button>)
        }
      </div>
    </>
  );
};

export default HotelSummaryInfo;
