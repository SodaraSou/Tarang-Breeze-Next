"use client";

import { useState } from "react";
import { useGetSportTypes } from "@/data/sport";
import { createTeam } from "@/services/team";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function TeamCreateDialog() {
  const { data } = useGetSportTypes();
  const [inputData, setInputData] = useState({
    name: "",
    logo: "",
    sport_type_id: 0,
  });
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "photo") {
      setInputData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files[0],
      }));
    } else {
      setInputData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await createTeam(inputData);
    if (res.status === 204) {
      alert("Team Create Successfully");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Team</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Create Team here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Team Name</Label>
            <Input id="name" onChange={onChange} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="sport_type">Sport Type</Label>
            <Select
              onValueChange={(value) => {
                setInputData((prevState) => ({
                  ...prevState,
                  sport_type_id: value,
                }));
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectLabel>SportType</SelectLabel>
                  {data.sport_types.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id.toString()}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="logo">Logo</Label>
            <Input type="file" id="logo" onChange={onChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TeamCreateDialog;
