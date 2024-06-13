"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { searchAvailableTime } from "@/services/reservation";
import UserLayout from "../UserLayout";
import Spinner from "@/components/Spinner";
import VenueCard from "@/components/VenueCard";

function SearchResultPage() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const start_time = searchParams.get("start_time");
  const end_time = searchParams.get("end_time");
  const sport_type_id = parseInt(searchParams.get("sport_type_id"));
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchResults", date, start_time, end_time, sport_type_id],
    queryFn: () =>
      searchAvailableTime({ date, start_time, end_time, sport_type_id }),
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    if (
      date === "" ||
      start_time === "" ||
      end_time === "" ||
      sport_type_id === ""
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [date, start_time, end_time, sport_type_id]);

  useEffect(() => {
    if (open) {
      toast({
        variant: "destructive",
        description: "All search fields are required.",
      });
    }
  }, [open, toast]);
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 my-10">
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <Spinner />
            </div>
          ) : (
            <>
              {searchResults.status === 422 ? (
                <div className="flex justify-center items-center gap-4 p-10">
                  <Image
                    src="/favicon.ico"
                    width={32}
                    height={32}
                    alt="tarang_icon"
                  />
                  <h1 className="text-2xl font-semibold">
                    Something went wrong while searching
                  </h1>
                </div>
              ) : (
                <>
                  {searchResults.data.available_tarang.length === 0 ? (
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
                      {searchResults.data.available_tarang.map(
                        (venue, index) => (
                          <VenueCard
                            key={index}
                            venue={venue}
                            searchData={{
                              date,
                              start_time,
                              end_time,
                              sport_type_id,
                            }}
                          />
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default SearchResultPage;
