"use client";

import { useState } from "react";
import { createReservation } from "@/services/reservation";
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
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePicker from "./DatePicker";

function ReservationForm() {
  const [inputData, setInputData] = useState({
    phone: "",
    attendee: 0,
    data: "",
    start_time: "",
    end_time: "",
    venue_id: "",
    team_id: 0,
  });
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
  console.log(inputData);
  console.log(teamOptions);
  const onSubmit = async (e) => {
    e.preventDefault();
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
    formData.append("venue_id", inputData.venue_id);
    formData.append("find_team", teamOptions.find_team === true ? 1 : 0);
    formData.append("find_member", teamOptions.find_member === true ? 1 : 0);
    formData.append("team_id", resTeam.data.data.id);
    const res = await createReservation(formData);
    if (res.status === 204) {
      console.log("Success");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#2AD5A5] text-white">
          Reserve Venue
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Venue Reservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="name">Venue ID</Label>
              <Input
                type="data"
                className="rounded-lg"
                placeholder="Venue ID"
                id="venue_id"
                onChange={onChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Date</Label>
              <DatePicker
                onDateChange={(date) => {
                  setInputData((prevState) => ({
                    ...prevState,
                    start_time: date,
                  }));
                }}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name">Start Time</Label>
                <Select
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
                        <SelectItem value="7:00">7:00 AM</SelectItem>
                        <SelectItem value="8:00">8:00 AM</SelectItem>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
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
                        <SelectItem value="7:00">7:00 AM</SelectItem>
                        <SelectItem value="8:00">8:00 AM</SelectItem>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
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
              <Label htmlFor="name">Phone Number</Label>
              <Input type="data" className="rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="name">Number of Player</Label>
              <Input type="data" className="rounded-lg" />
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
