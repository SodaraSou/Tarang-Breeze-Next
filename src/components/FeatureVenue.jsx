"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/services/venue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import VenueCard from "./VenueCard";

function FeatureVenue() {

    const { data: venues, isLoading: venuesLoading } = useQuery({
        queryKey: ["venues"],
        queryFn: getAllVenues,
      });
      console.log(venues);

  return (
    <Card className="bg-white border-none">
      <CardHeader>
        <CardTitle>Feature Venue</CardTitle>
      </CardHeader>
      <CardContent>
        {venuesLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <>
            {venues.venues
              .length === 0 ? (
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
                {venues.venues.map((venue, index) => (
                  <VenueCard key={index} venue={venue} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default FeatureVenue