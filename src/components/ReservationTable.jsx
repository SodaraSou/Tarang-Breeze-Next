"use client";

import { useState } from "react";
import { useGetReservationWithPagination } from "@/data/reservation";
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
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReservationCreateDialog from "./ReservationCreateDialog";
import ReservationEditDialog from "./ReservationEditDialog";
import ReservationDeleteDialog from "./ReservationDeleteDialog";

function ReservationTable() {
  const [paginationUrl, setPaginationUrl] = useState("");
  const { data } = useGetReservationWithPagination(paginationUrl);
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
          <div>
            <ReservationCreateDialog />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Sport</TableHead>
              <TableHead className="hidden md:table-cell">Venue ID</TableHead>
              <TableHead className="hidden md:table-cell">Time</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((reservation, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {reservation.phone}
                </TableCell>
                <TableCell>
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
          Showing <strong>1-10</strong> of <strong>{data?.length}</strong>{" "}
          reservations
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePaginationChange(data.links.prev)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePaginationChange(data.links.next)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ReservationTable;
