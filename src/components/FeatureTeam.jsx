"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservationWithPaginationPage } from "@/services/reservation";
import TeamCard from "./TeamCard";
import Spinner from "@/components/Spinner";

function FeatureTeam() {
  const [paginationUrl, setPaginationUrl] = useState("/api/reservation");
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservationsWithPagination", paginationUrl],
    queryFn: () => getReservationWithPaginationPage(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
      <div className="w-full flex justify-between items-center my-6 md:my-0">
        <h1 className="font-semibold text-2xl leading-none tracking-tight">
          Feature Team
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[450px]">
          <Spinner />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
          {reservations.data.data
            .filter((reservation) => reservation.find_team === 1)
            .map((reservation, index) => (
              <>
                <TeamCard key={index} team={reservation.team} />
              </>
            ))}
        </div>
      )}
    </div>
  );
}

export default FeatureTeam;
