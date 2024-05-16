"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservationByUser } from "@/services/reservation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "./Spinner";
import TournamentCard from "./TournamentCard";

function Reservation() {
  const [paginationUrl, setPaginationUrl] = useState("/api/reservations-user");
  const { data, isLoading } = useQuery({
    queryKey: ["reservationByUser", paginationUrl],
    queryFn: () => getReservationByUser(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
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
                {data?.data.reservations.map((reservation, index) => (
                  <TournamentCard key={index} reservation={reservation} />
                ))}
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <div>
          <Pagination>
            <PaginationContent>
              {data?.meta.links.map((link, index) => (
                <div key={index}>
                  {link.label === "&laquo; Previous" && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          link.url && handlePaginationChange(link.url)
                        }
                      />
                    </PaginationItem>
                  )}
                  {link.label !== "&laquo; Previous" &&
                    link.label !== "Next &raquo;" && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            link.url && handlePaginationChange(link.url)
                          }
                          isActive={link.active}
                        >
                          {link.label}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  {link.label === "Next &raquo;" && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          link.url && handlePaginationChange(link.url)
                        }
                      />
                    </PaginationItem>
                  )}
                </div>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Reservation;
