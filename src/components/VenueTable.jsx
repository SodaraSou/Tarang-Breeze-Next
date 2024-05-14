"use client";

import Image from "next/image";
import { useGetVenues } from "@/data/veune";
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
import VenueEditDialog from "@/components/VenueEditDialog";
import VenueDeleteDialog from "@/components/VenueDeleteDialog";
import VenueCreateDialog from "./VenueCreateDialog";

function VenueTable() {
  const { data } = useGetVenues();
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Venues</CardTitle>
            <CardDescription>Manage Venue</CardDescription>
          </div>
          <VenueCreateDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.venues.map((venue, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{venue.id}</TableCell>
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
                <TableCell>
                  <VenueEditDialog venue={venue} />
                  <VenueDeleteDialog venue={venue} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of{" "}
          <strong>{data?.venues.length}</strong> venues
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
}

export default VenueTable;
