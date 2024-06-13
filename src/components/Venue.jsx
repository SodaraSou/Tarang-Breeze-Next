"use client";

import { useQuery } from "@tanstack/react-query";
import { showSingleVenue } from "@/services/venue";
import { Check } from "lucide-react";
import { GiTennisCourt } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationCreateDialog from "@/components/ReservationCreateDialog";
import Spinner from "./Spinner";
import { Button } from "@/components/ui/button";

function Venue({ venueId, searchData }) {
  const { data: venue, isLoading: venueLoading } = useQuery({
    queryKey: ["venue", venueId],
    queryFn: () => showSingleVenue(venueId),
  });
  if (venueLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );
  }
  return (
    <section className="p-4 md:p-10">
      <div className="flex flex-col gap-4 md:gap-10 w-full">
        <Card className="bg-white rounded-xl">
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <CardDescription>test</CardDescription>
              <CardTitle>{venue?.name}</CardTitle>
            </div>
            <ReservationCreateDialog
              isUser={true}
              venue={venue}
              triggerContent={<Button>Reserve Venue</Button>}
              searchData={searchData}
            />
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-10">
          <div>
            <Card className="bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Description and Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 text-2xl">
                  <div className="flex gap-4 justify-center items-center">
                    <GiTennisCourt />
                    <h1 className="font-bold text-2xl text-blue-500">
                      {venue?.size} Players
                    </h1>
                  </div>
                  <div className="text-sm md:text-base">
                    <p>{venue?.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex gap-2">
                    <Check className="w-5 h-5" />
                    <h1 className="text-sm md:text-base">Parking</h1>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5" />
                    <h1 className="text-sm md:text-base">Drinking Water</h1>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5" />
                    <h1 className="text-sm md:text-base">First Aid</h1>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5" />
                    <h1 className="text-sm md:text-base">Rest Room</h1>
                  </div>
                  <div className="flex gap-2">
                    <Check className="w-5 h-5" />
                    <h1 className="text-sm md:text-base">Change Room</h1>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Venue;
