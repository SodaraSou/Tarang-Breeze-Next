"use client";

import Link from "next/link";
import { useGetVenues } from "@/data/veune";
import { ArrowRight } from "lucide-react";
import VenueCard from "./VenueCard";
import Spinner from "./Spinner";

function FeatureVenue() {
  const { data: venueData, isLoading: venueDataLoading } = useGetVenues();
  return (
    <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl md:text-4xl my-6 md:my-0">
          Feature Venue
        </h1>
        <Link
          className="flex items-center gap-2 font-bold text-xl"
          href="/venue"
        >
          more
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      {venueDataLoading ? (
        <div>
          <Spinner />
        </div>
      ) : !venueDataLoading && venueData ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
          {venueData.venues.slice(0, 6).map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold p-10">No Venue</h2>
        </div>
      )}
    </div>
  );
}

export default FeatureVenue;
