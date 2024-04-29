"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getVenues } from "@/services/venue";
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
import VenueEditDialog from "@/components/VenueEditDialog";
import VenueDeleteDialog from "@/components/VenueDeleteDialog";
import VenueCreateDialog from "./VenueCreateDialog";
import Spinner from "./Spinner";

function VenueTable() {
  const { data, isLoading } = useQuery({
    queryFn: getVenues,
    queryKey: ["getVenuesKey"],
  });
  if (isLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Venue</CardTitle>
            <CardDescription>Manage Venue</CardDescription>
          </div>
          <VenueCreateDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Size</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Reserve
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.venues.map((venue, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    width={64}
                    height={64}
                    src={venue.photo}
                  />
                </TableCell>
                <TableCell className="font-medium">{venue.name}</TableCell>
                <TableCell>{venue.sportTypes.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {venue.size}
                </TableCell>
                <TableCell className="hidden md:table-cell">25</TableCell>
                <TableCell>
                  <VenueEditDialog venue={venue} />
                  <VenueDeleteDialog venue={venue} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}

export default VenueTable;
