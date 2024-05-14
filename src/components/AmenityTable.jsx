"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import { useGetAmenities } from "@/data/amenity";
import AmenityCreateDialog from "@/components/AmenityCreateDialog";
import AmenityEditDialog from "@/components/AmenityEditDialog";
import AmenityDeleteDialog from "@/components/AmenityDeleteDialog";

function AmenityTable() {
  const { data } = useGetAmenities();
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>Manage Amenities</CardDescription>
          </div>
          <AmenityCreateDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.amenities.map((amenity, index) => (
              <TableRow key={index}>
                <TableCell>{amenity.id}</TableCell>
                <TableCell className="font-medium">{amenity.name}</TableCell>
                <TableCell>
                  <AmenityEditDialog amenity={amenity} />
                  <AmenityDeleteDialog amenity={amenity} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AmenityTable;
