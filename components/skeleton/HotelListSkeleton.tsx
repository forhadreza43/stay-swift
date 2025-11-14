import React from 'react'

export default function HotelListSkeleton() {
  return (
     <>
        <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
           <div className="container items-center py-12 ">
              
           </div>
        </section>
        <section className="py-12">
           <div className="container grid grid-cols-12">
              {/* <Filter />
              <HotelList searchQuery={searchQuery} /> */}
           </div>
        </section>
     </>
  );
}
