"use client";

import { useQuery } from "@tanstack/react-query";
import { getReservationByUser } from "@/services/reservation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "./Spinner";
import TournamentCard from "./TournamentCard";

function Reservation() {
  const { data, isLoading } = useQuery({
    queryKey: ["reservationByUser"],
    queryFn: getReservationByUser,
  });
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Reservation</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.data.reservations.length === 0 ? (
              <div className="flex justify-center p-10">
                <h1 className="text-2xl font-semibold">No Reservation</h1>
              </div>
            ) : (
              <>
                {data?.reservations.map((reservation, index) => (
                  <TournamentCard key={index} reservation={reservation} />
                ))}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Reservation;
