"use client";

import { useQuery } from "@tanstack/react-query";
import { getReservation, deleteReservation } from "@/services/reservation";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReservationForm from "@/components/ReservationForm";
import Spinner from "./Spinner";

function ReservationTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => await getReservation(),
  });
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      ) : (
        <Card className="bg-white rounded-xl">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Reservations</CardTitle>
                <CardDescription>Manage your Reservations.</CardDescription>
              </div>
              <div>
                <ReservationForm />
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
                  <TableHead className="hidden md:table-cell">
                    Venue ID
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.reservations.map((reservation, index) => (
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
                      {reservation.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of{" "}
              <strong>{data?.data.reservations.length}</strong> reservations
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default ReservationTable;
