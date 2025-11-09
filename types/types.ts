export type Hotel = {
   id: string;
   name: string;
   address1: string;
   airportCode: string;
   city: string;
   countryCode: string;
   highRate: number;
   location: {
      latitude: number;
      longitude: number;
   };
   locationDescription: string;
   lowRate: number;
   postalCode: number;
   propertyCategory: number;
   shortDescription: string;
   stateProvinceCode: string;
   thumbNailUrl: string;
   gallery: string[];
   overview: string;
   amenities: string[];
};

export type Review = {
   id: string;
   hotelId: string;
   userId: string;
   review: string;
};
