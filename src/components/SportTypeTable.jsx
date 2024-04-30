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
    <>
      <Card className="bg-white rounded-xl">
        <CardHeader className="flex justify-between">
          <div className="flex justify-between">
            <div>
              <CardTitle>SportTypes</CardTitle>
              <CardDescription>Manage SportTypes</CardDescription>
            </div>
            <SportCreateDailog />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sport_types.map((sport, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell"></TableCell>
                  <TableCell className="font-medium">{sport.name}</TableCell>
                  <TableCell>{sport.id}</TableCell>
                  <TableCell>
                    <SportDeleteDailog sport={sport}/>
                    <SportUpdateDailog sport={sport}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default SportTypeTable