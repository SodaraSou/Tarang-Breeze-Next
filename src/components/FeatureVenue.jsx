"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/services/venue";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import VenueCard from "./VenueCard";

function FeatureVenue({ sport }) {
  const { data: venues, isLoading: venuesLoading } = useQuery({
    queryKey: ["venues"],
    queryFn: getAllVenues,
  });
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
      <h1 className="text-2xl font-semibold mb-4">Feature Venue</h1>
      <div>
        {venuesLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <>
            {venues.data.venues.length === 0 ? (
              <div className="flex justify-center items-center gap-4 p-10">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Venue</h1>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {venues.data.venues.map((venue, index) => (
                  <VenueCard key={index} venue={venue} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FeatureVenue;
