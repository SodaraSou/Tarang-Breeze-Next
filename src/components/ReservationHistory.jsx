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
import Image from "next/image";

function ReservationHistory() {
  const [paginationUrl, setPaginationUrl] = useState(
    "/api/reservations-user/history"
  );
  const { data, isLoading } = useQuery({
    queryKey: ["reservationByUser", paginationUrl],
    queryFn: () => getReservationByUser(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  console.log(data);
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Your Reservations History</CardTitle>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col gap-4">
              {data?.data.reservations.length === 0 ? (
                <div className="flex justify-center items-center gap-4 p-10">
                  <Image
                    src="/favicon.ico"
                    width={32}
                    height={32}
                    alt="tarang_icon"
                  />
                  <h1 className="text-2xl font-semibold">No Reservations</h1>
                </div>
              ) : (
                <>
                  {data?.data.reservations.map((reservation, index) => (
                    <TournamentCard key={index} reservation={reservation} />
                  ))}
                </>
              )}
            </div>
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
        </>
      )}
    </Card>
  );
}

export default ReservationHistory;
