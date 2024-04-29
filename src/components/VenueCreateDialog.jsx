"use client";

import { useState } from "react";
import { createVenue } from "@/services/venue";
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
  SelectLabel
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getSportTypes } from "@/services/sport";
import { useQuery } from "@tanstack/react-query";

function VenueCreateDialog() {
  const [inputData, setUpdateData] = useState({
    name: "",
    size: 0,
    sport_type_id: 0,
    description: "",
    photo: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "photo") {
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files[0],
      }));
    } else {
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  const {data, isLoading } = useQuery({
    queryKey:["SportTypes"],
    queryFn: async () => await getSportTypes(),
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    await createVenue(inputData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Venue</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Venue</DialogTitle>
          <DialogDescription>
            Create your venue here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" onChange={onChange} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="sport_type">Sport Type</Label>
            <Select
              onValueChange={(value) => {
                setUpdateData((prevState) => ({
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
                  {data?.sport_types.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id.toString()}>
                          {sport.name}
                        </SelectItem>
                      ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="size">Size</Label>
            <Input id="size" type="number" onChange={onChange} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="size">Description</Label>
            <Textarea
              placeholder="Type your message here."
              id="description"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="size">Image</Label>
            <Input type="file" id="photo" onChange={onChange} />
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

export default VenueCreateDialog;
