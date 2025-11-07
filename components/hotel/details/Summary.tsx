import { Hotel } from "@/types/types";
import HotelSummaryInfo from "../HotelSummaryInfo";

const Summary = ({ hotel }:{ hotel: Hotel }) => {
  return (
     <section className="py-4 mt-[100px] ">
        <div className="flex container">
           <HotelSummaryInfo fromListPage={false} hotel={hotel} />
        </div>
     </section>
  );
};

export default Summary;

