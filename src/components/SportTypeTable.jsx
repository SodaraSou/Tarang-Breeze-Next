"use client";

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
import SportCreateDailog from "./SportCreateDailog";
import { useGetSportTypes } from "@/data/sport";
import SportDeleteDailog from "./SportDeleteDailog";
import SportUpdateDailog from "./SportUpdateDailog";

function SportTypeTable() {
  const { data } = useGetSportTypes();
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Sport Types</CardTitle>
            <CardDescription>Manage SportTypes</CardDescription>
          </div>
          <SportCreateDailog />
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
            {data.sport_types.map((sport, index) => (
              <TableRow key={index}>
                <TableCell>{sport.id}</TableCell>
                <TableCell className="font-medium">{sport.name}</TableCell>
                <TableCell>
                  <SportUpdateDailog sport={sport} />
                  <SportDeleteDailog sport={sport} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SportTypeTable;
