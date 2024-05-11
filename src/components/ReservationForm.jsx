"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getVenues } from "@/services/venue";
// import { getUser } from "@/services/user";
import {
  createReservation,
  getAvailableTime,
  updateReservation,
} from "@/services/reservation";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePicker from "./DatePicker";
import Spinner from "./Spinner";

function ReservationForm({
  isUser,
  venue,
  reservation,
  formTitle,
  dialogTitle,
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["venues"],
    queryFn: async () => await getVenues(),
  });
  const [inputData, setInputData] = useState({
    phone: reservation ? reservation.phone : "",
    attendee: reservation ? reservation.attendee : 0,
    date: reservation ? reservation.date : "",
    start_time: reservation
      ? reservation.start_time.replace(" AM", "").replace(" PM", "")
      : "",
    end_time: reservation
      ? reservation.end_time.replace(" AM", "").replace(" PM", "")
      : "",
    venue_id:
      venue || reservation ? (venue ? venue.id : reservation.venue.id) : 0,
    team_id: 1,
  });
  const { data: availableTime } = useQuery({
    queryKey: ["availableTimes"],
    queryFn: async () => await getAvailableTime(inputData.date),
  });
  console.log(inputData.date);
  const [teamOptions, setTeamOptions] = useState({
    find_team: false,
    find_member: false,
  });
  // if (inputData.date !== "") {
  //   const res = getAvailableTime(inputData.date);
  //   console.log(res);
  // }
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
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    // const user = await getUser();
    // if (user === undefined) {
    //   router.push("/login");
    //   return;
    // }
    // const teamFormData = new FormData();
    // teamFormData.append("name", inputData.name);
    // teamFormData.append("sport_type_id", inputData.sport_type_id);
    // const resTeam = await createTeam(teamFormData);
    const formData = new FormData();
    formData.append("phone", inputData.phone);
    formData.append("attendee", parseInt(inputData.attendee));
    formData.append("date", inputData.date);
    formData.append("start_time", inputData.start_time);
    formData.append("end_time", inputData.end_time);
    formData.append("venue_id", parseInt(inputData.venue_id));
    formData.append("find_team", teamOptions.find_team === true ? 1 : 0);
    formData.append("find_member", teamOptions.find_member === true ? 1 : 0);
    formData.append("team_id", parseInt(inputData.team_id));
    if (dialogTitle == "Edit Reservation") {
      const res = await updateReservation(
        {
          ...inputData,
          attendee: parseInt(inputData.attendee),
          find_team: teamOptions.find_team === true ? 1 : 0,
          find_member: teamOptions.find_member === true ? 1 : 0,
          team_id: 1,
        },
        reservation.id
      );
      if (res.status === 204) {
        console.log("Update Success");
      }
    } else {
      const res = await createReservation(formData);
      if (res.status === 204) {
        console.log("Success");
      }
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#2AD5A5] text-white">
          {formTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="name">Venue</Label>
              <Select
                defaultValue={inputData.venue_id.toString()}
                disabled={isUser}
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
                      {data.venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id.toString()}>
                          {venue.name} - {venue.sportTypes.name}
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
                onValue={inputData.date}
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
                  defaultValue={inputData.start_time
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
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 AM</SelectItem>
                        <SelectItem value="13:00">13:00 PM</SelectItem>
                        <SelectItem value="14:00">14:00 PM</SelectItem>
                        <SelectItem value="15:00">15:00 PM</SelectItem>
                        <SelectItem value="16:00">16:00 PM</SelectItem>
                        <SelectItem value="17:00">17:00 PM</SelectItem>
                        <SelectItem value="18:00">18:00 PM</SelectItem>
                        <SelectItem value="19:00">19:00 PM</SelectItem>
                        <SelectItem value="20:00">20:00 PM</SelectItem>
                        <SelectItem value="21:00">21:00 PM</SelectItem>
                        <SelectItem value="22:00">22:00 PM</SelectItem>
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name">End Time</Label>
                <Select
                  defaultValue={inputData.end_time
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
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 AM</SelectItem>
                        <SelectItem value="13:00">13:00 PM</SelectItem>
                        <SelectItem value="14:00">14:00 PM</SelectItem>
                        <SelectItem value="15:00">15:00 PM</SelectItem>
                        <SelectItem value="16:00">16:00 PM</SelectItem>
                        <SelectItem value="17:00">17:00 PM</SelectItem>
                        <SelectItem value="18:00">18:00 PM</SelectItem>
                        <SelectItem value="19:00">19:00 PM</SelectItem>
                        <SelectItem value="20:00">20:00 PM</SelectItem>
                        <SelectItem value="21:00">21:00 PM</SelectItem>
                        <SelectItem value="22:00">22:00 PM</SelectItem>
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                type="text"
                id="phone"
                onChange={onChange}
                className="rounded-lg"
                defaultValue={inputData.phone}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="name">Number of Player</Label>
              <Input
                type="number"
                id="attendee"
                onChange={onChange}
                className="rounded-lg"
                defaultValue={inputData.attendee}
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
                  <label htmlFor="find_team">Find a team to play against</label>
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
                  <label htmlFor="find_member">Find team member</label>
                </div>
              </div>
            </div>
            {(teamOptions.find_member === true ||
              teamOptions.find_team === true) && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Team Name</Label>
                  <Input type="data" className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Description</Label>
                  <Input type="data" className="rounded-lg" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              className="bg-[#2AD5A5] text-white mt-4"
            >
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ReservationForm;
