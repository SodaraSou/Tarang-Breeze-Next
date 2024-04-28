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
import Spinner from "@/components/Spinner";
import ReservationForm from "@/components/ReservationForm";
import UserLayout from "@/app/UserLayout";

function SingleVenuePage({ params }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await showSingleVenue(params.id),
    queryKey: ["singleVenues"],
  });
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        {isLoading ? (
          <div className="h-screen">
            <Spinner fullScreenSpinner={true} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-10 w-full">
            <Card className="bg-white rounded-xl">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <CardDescription>test</CardDescription>
                  <CardTitle>{data?.name}</CardTitle>
                </div>
                <ReservationForm isUser={true} venue={data} />
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
                          {data?.size} Players
                        </h1>
                      </div>
                      <div className="text-sm md:text-base">
                        <p>{data?.description}</p>
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
        )}
      </section>
    </UserLayout>
  );
}

export default SingleVenuePage;
