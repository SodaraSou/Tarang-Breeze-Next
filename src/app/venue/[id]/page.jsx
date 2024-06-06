"use client";

import Image from "next/image";
import CryptoJS, { AES } from "crypto-js";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleVenue } from "@/services/venue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserLayout from "@/app/UserLayout";
import ReservationCreateDialog from "@/components/ReservationCreateDialog";
import Spinner from "@/components/Spinner";

function SingleVenuePage({ params }) {
  const searchParams = useSearchParams();
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const encryptedQuery = searchParams.get("data");
  const bytes = CryptoJS.AES.decrypt(encryptedQuery, secretKey);
  const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const { data: venue, isLoading } = useQuery({
    queryKey: ["singleVenue", params.id],
    queryFn: () => getSingleVenue(params.id),
  });
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <div className="w-full space-y-4 md:space-y-10">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{venue.name}</CardTitle>
                      <CardDescription>Test</CardDescription>
                    </div>
                    <div>
                      <ReservationCreateDialog
                        venue={venue}
                        searchData={originalData}
                        triggerContent={
                          <Button
                            variant="outline"
                            className="bg-[#2ad5a5] text-white"
                          >
                            Reserve Venue
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 text-gray-400">
                    <div>
                      <h1 className="font-bold text-xl mb-4">
                        Venue Description
                      </h1>
                      <div className="flex flex-col gap-4 text-2xl">
                        <h1 className="font-bold text-2xl text-blue-500 text-center">
                          {venue.size} Players
                        </h1>
                        <div className="text-sm md:text-base">
                          <p>{venue.description}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="font-bold text-xl mb-4">Amenities</h1>
                      <div className="flex flex-wrap gap-2">
                        {venue.amenities.map((amenity) => (
                          <div className="flex items-center gap-2">
                            <p key={amenity.id}>{amenity.name}</p>
                            <Check className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Check for availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Select
                      // onValueChange={(value) => {
                      //   setInputData((prevState) => ({
                      //     ...prevState,
                      //     start_time: value,
                      //   }));
                      // }}
                      required
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Start Time" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <ScrollArea className="h-32">
                          <SelectGroup>
                            <SelectLabel>Start Time</SelectLabel>
                            <SelectItem value="07:00">7:00 AM</SelectItem>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 AM</SelectItem>
                            <SelectItem value="13:00">13:00 PM</SelectItem>
                            <SelectItem value="14:00">14:00 PM</SelectItem>
                            <SelectItem value="15:00">15:00 PM</SelectItem>
                            <SelectItem value="16:00">16:00 PM</SelectItem>
                            <SelectItem value="17:00">17:00 PM</SelectItem>
                            <SelectItem value="18:00">18:00 PM</SelectItem>
                            <SelectItem value="19:00">19:00 PM</SelectItem>
                            <SelectItem value="20:00">20:00 PM</SelectItem>
                            <SelectItem value="21:00">21:00 PM</SelectItem>
                            <SelectItem value="22:00">22:00 PM</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <Select
                      // onValueChange={(value) => {
                      //   setInputData((prevState) => ({
                      //     ...prevState,
                      //     start_time: value,
                      //   }));
                      // }}
                      required
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select End Time" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <ScrollArea className="h-32">
                          <SelectGroup>
                            <SelectLabel>End Time</SelectLabel>
                            <SelectItem value="07:00">7:00 AM</SelectItem>
                            <SelectItem value="08:00">8:00 AM</SelectItem>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 AM</SelectItem>
                            <SelectItem value="13:00">13:00 PM</SelectItem>
                            <SelectItem value="14:00">14:00 PM</SelectItem>
                            <SelectItem value="15:00">15:00 PM</SelectItem>
                            <SelectItem value="16:00">16:00 PM</SelectItem>
                            <SelectItem value="17:00">17:00 PM</SelectItem>
                            <SelectItem value="18:00">18:00 PM</SelectItem>
                            <SelectItem value="19:00">19:00 PM</SelectItem>
                            <SelectItem value="20:00">20:00 PM</SelectItem>
                            <SelectItem value="21:00">21:00 PM</SelectItem>
                            <SelectItem value="22:00">22:00 PM</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full">
              <Image
                src={venue.photo}
                alt="venue_photo"
                width={1200}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}

export default SingleVenuePage;
