"use client";

import { useGetVenues } from "@/data/veune";
import VenueCard from "./VenueCard";

function SearchVenue() {
  const { data } = useGetVenues();
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
      {data.venues.map((venue, index) => (
        <VenueCard key={index} venue={venue} />
      ))}
    </div>
  );
}

export default SearchVenue;
