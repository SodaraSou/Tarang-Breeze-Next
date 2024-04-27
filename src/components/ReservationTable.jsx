"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getReservation,
  updateReservation,
  deleteReservation,
} from "@/services/reservation";
import { getVenues } from "@/services/venue";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReservationForm from "@/components/ReservationForm";
import Spinner from "./Spinner";
import DatePicker from "./DatePicker";

function ReservationTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => await getReservation(),
  });
  const { data: venuesData } = useQuery({
    queryKey: ["venues"],
    queryFn: async () => await getVenues(),
  });
  console.log(data);
  const [inputData, setInputData] = useState({
    phone: "",
    attendee: 0,
    date: "",
    start_time: "",
    end_time: "",
    venue_id: 0,
    team_id: 1,
  });
  console.log(inputData);
  const [teamOptions, setTeamOptions] = useState({
    find_team: false,
    find_member: false,
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleCheck = (e) => {
    setTeamOptions({
      ...teamOptions,
      [e.target.value]: e.target.checked,
    });
  };
  const [dialog, setDialog] = useState("");
  const handleChangeDialog = (option) => {
    setDialog(option);
  };
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
                      <Dialog>
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
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onClick={() => handleChangeDialog("edit")}
                              >
                                Edit
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onClick={() => handleChangeDialog("delete")}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {dialog === "edit" ? (
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Update Reservation</DialogTitle>
                            </DialogHeader>
                            <form>
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                  <Label htmlFor="name">Venue</Label>
                                  <Select
                                    defaultValue={reservation.venue.id.toString()}
                                    onValueChange={(id) => {
                                      setInputData((prevState) => ({
                                        ...prevState,
                                        venue_id: id,
                                      }));
                                    }}
                                    required
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select venue" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                      <ScrollArea className="h-32">
                                        <SelectGroup>
                                          <SelectLabel>Venue</SelectLabel>
                                          {venuesData.venues.map((venue) => (
                                            <SelectItem
                                              key={venue.id}
                                              value={venue.id.toString()}
                                            >
                                              {venue.name} -{" "}
                                              {venue.sportTypes.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </ScrollArea>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Label htmlFor="name">Date</Label>
                                  <DatePicker
                                    onValue={reservation.date}
                                    onDateChange={(date) => {
                                      setInputData((prevState) => ({
                                        ...prevState,
                                        date: date.toISOString(),
                                      }));
                                    }}
                                  />
                                </div>
                                <div className="flex gap-4">
                                  <div className="flex flex-col gap-2 w-full">
                                    <Label htmlFor="name">Start Time</Label>
                                    <Select
                                      defaultValue={reservation.start_time
                                        .replace(" AM", "")
                                        .replace(" PM", "")}
                                      onValueChange={(value) => {
                                        setInputData((prevState) => ({
                                          ...prevState,
                                          start_time: value,
                                        }));
                                      }}
                                      required
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select start time" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white">
                                        <ScrollArea className="h-32">
                                          <SelectGroup>
                                            <SelectItem value="07:00">
                                              7:00 AM
                                            </SelectItem>
                                            <SelectItem value="08:00">
                                              8:00 AM
                                            </SelectItem>
                                            <SelectItem value="09:00">
                                              9:00 AM
                                            </SelectItem>
                                            <SelectItem value="10:00">
                                              10:00 AM
                                            </SelectItem>
                                            <SelectItem value="11:00">
                                              11:00 AM
                                            </SelectItem>
                                            <SelectItem value="12:00">
                                              12:00 AM
                                            </SelectItem>
                                            <SelectItem value="13:00">
                                              13:00 PM
                                            </SelectItem>
                                            <SelectItem value="14:00">
                                              14:00 PM
                                            </SelectItem>
                                            <SelectItem value="15:00">
                                              15:00 PM
                                            </SelectItem>
                                            <SelectItem value="16:00">
                                              16:00 PM
                                            </SelectItem>
                                            <SelectItem value="17:00">
                                              17:00 PM
                                            </SelectItem>
                                            <SelectItem value="18:00">
                                              18:00 PM
                                            </SelectItem>
                                            <SelectItem value="19:00">
                                              19:00 PM
                                            </SelectItem>
                                            <SelectItem value="20:00">
                                              20:00 PM
                                            </SelectItem>
                                            <SelectItem value="21:00">
                                              21:00 PM
                                            </SelectItem>
                                            <SelectItem value="22:00">
                                              22:00 PM
                                            </SelectItem>
                                          </SelectGroup>
                                        </ScrollArea>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex flex-col gap-2 w-full">
                                    <Label htmlFor="name">End Time</Label>
                                    <Select
                                      defaultValue={reservation.end_time
                                        .replace(" AM", "")
                                        .replace(" PM", "")}
                                      onValueChange={(value) => {
                                        setInputData((prevState) => ({
                                          ...prevState,
                                          end_time: value,
                                        }));
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select end time" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white">
                                        <ScrollArea className="h-32">
                                          <SelectGroup>
                                            <SelectItem value="07:00">
                                              7:00 AM
                                            </SelectItem>
                                            <SelectItem value="08:00">
                                              8:00 AM
                                            </SelectItem>
                                            <SelectItem value="09:00">
                                              9:00 AM
                                            </SelectItem>
                                            <SelectItem value="10:00">
                                              10:00 AM
                                            </SelectItem>
                                            <SelectItem value="11:00">
                                              11:00 AM
                                            </SelectItem>
                                            <SelectItem value="12:00">
                                              12:00 AM
                                            </SelectItem>
                                            <SelectItem value="13:00">
                                              13:00 PM
                                            </SelectItem>
                                            <SelectItem value="14:00">
                                              14:00 PM
                                            </SelectItem>
                                            <SelectItem value="15:00">
                                              15:00 PM
                                            </SelectItem>
                                            <SelectItem value="16:00">
                                              16:00 PM
                                            </SelectItem>
                                            <SelectItem value="17:00">
                                              17:00 PM
                                            </SelectItem>
                                            <SelectItem value="18:00">
                                              18:00 PM
                                            </SelectItem>
                                            <SelectItem value="19:00">
                                              19:00 PM
                                            </SelectItem>
                                            <SelectItem value="20:00">
                                              20:00 PM
                                            </SelectItem>
                                            <SelectItem value="21:00">
                                              21:00 PM
                                            </SelectItem>
                                            <SelectItem value="22:00">
                                              22:00 PM
                                            </SelectItem>
                                          </SelectGroup>
                                        </ScrollArea>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                  <Label htmlFor="phone_number">
                                    Phone Number
                                  </Label>
                                  <Input
                                    type="text"
                                    id="phone"
                                    onChange={onChange}
                                    defaultValue={reservation.phone}
                                    className="rounded-lg"
                                  />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                  <Label htmlFor="name">Number of Player</Label>
                                  <Input
                                    type="number"
                                    id="attendee"
                                    onChange={onChange}
                                    defaultValue={reservation.attendee}
                                    className="rounded-lg"
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Label htmlFor="name">Optional</Label>
                                  <div className="flex flex-col md:flex-row gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <input
                                        onChange={handleCheck}
                                        checked={teamOptions.find_team}
                                        type="checkbox"
                                        value="find_team"
                                        id="find_team"
                                        name="default-checkbox"
                                      />
                                      <label htmlFor="find_team">
                                        Find a team to play against
                                      </label>
                                    </div>
                                    <div className="flex gap-2">
                                      <input
                                        onChange={handleCheck}
                                        checked={teamOptions.find_member}
                                        type="checkbox"
                                        value="find_member"
                                        id="find_member"
                                        name="default-checkbox"
                                      />
                                      <label htmlFor="find_member">
                                        Find team member
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                {(teamOptions.find_member === true ||
                                  teamOptions.find_team === true) && (
                                  <>
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="name">Team Name</Label>
                                      <Input
                                        type="data"
                                        className="rounded-lg"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="name">Description</Label>
                                      <Input
                                        type="data"
                                        className="rounded-lg"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </form>
                            <DialogFooter>
                              <Button type="submit">Confirm</Button>
                            </DialogFooter>
                          </DialogContent>
                        ) : (
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Are you sure to delete?</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                              <Button type="submit">Confirm</Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
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
