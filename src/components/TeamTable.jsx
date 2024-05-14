"use client";

import { useGetTeams } from "@/data/team";
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
import TeamCreateDialog from "./TeamCreateDialog";
import TeamEditDialog from "./TeamEditDialog";
import TeamDeleteDialog from "./TeamDeleteDialog";

function TeamTable() {
  const { data } = useGetTeams();
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex justify-between">
        <div className="flex justify-between">
          <div>
            <CardTitle>Team</CardTitle>
            <CardDescription>Manage Team</CardDescription>
          </div>
          <TeamCreateDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Logo</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.teams.map((team, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{team.id}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <img
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src={team.logo}
                  />
                </TableCell>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.sportType.name}</TableCell>
                <TableCell>
                  <TeamEditDialog team={team} />
                  <TeamDeleteDialog teamId={team.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{data.teams.length}</strong>{" "}
          teams
        </div>
      </CardFooter>
    </Card>
  );
}

export default TeamTable;
