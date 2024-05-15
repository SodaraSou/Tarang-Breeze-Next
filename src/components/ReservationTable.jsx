"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservationWithPaginationPage } from "@/services/reservation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ReservationEditDialog from "./ReservationEditDialog";
import ReservationDeleteDialog from "./ReservationDeleteDialog";
import Spinner from "@/components/Spinner";
import { useGetVenues } from "@/data/veune";

function ReservationTable() {
  const [paginationUrl, setPaginationUrl] = useState("/api/reservation");
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservationsWithPagination", paginationUrl],
    queryFn: () => getReservationWithPaginationPage(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Reservations</CardTitle>
            <CardDescription>Manage your Reservations.</CardDescription>
          </div>
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-[450px]">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent className="h-[450px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="hidden sm:table-cell">Sport</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Venue ID
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.data.data.map((reservation, index) => (
                  <TableRow key={index}>
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell className="font-medium">
                      {reservation.phone}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">
                        {reservation.venue.sportTypes.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {reservation.venue.id}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {reservation.start_time} - {reservation.end_time}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(reservation.date, "PPP")}
                    </TableCell>
                    <TableCell>
                      <ReservationEditDialog reservation={reservation} />
                      <ReservationDeleteDialog reservationId={reservation.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-5</strong> of{" "}
              <strong>{reservations.data.data.length}</strong> reservations
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  {reservations.data.meta.links.map((link) => (
                    <PaginationItem>
                      {link.label === "&laquo; Previous" && (
                        <PaginationPrevious
                          onClick={() =>
                            link.url && handlePaginationChange(link.url)
                          }
                        />
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
                        <PaginationNext
                          onClick={() =>
                            link.url && handlePaginationChange(link.url)
                          }
                        />
                      )}
                    </PaginationItem>
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

export default ReservationTable;
