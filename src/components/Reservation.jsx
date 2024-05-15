"use client";

import { useQuery } from "@tanstack/react-query";
import { getReservationByUser } from "@/services/reservation";
import Spinner from "./Spinner";
import TournamentCard from "./TournamentCard";

function Reservation() {
  const { data, isLoading } = useQuery({
    queryKey: ["reservationByUser"],
    queryFn: getReservationByUser,
  });
  return (
    <div className="flex flex-col gap-4 justify-center border border-gray-200 bg-white shadow p-4 md:p-10 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl md:text-4xl">Reservation</h1>
      </div>
      <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data?.reservations.map((reservation, index) => (
            <TournamentCard key={index} reservation={reservation} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservation;
