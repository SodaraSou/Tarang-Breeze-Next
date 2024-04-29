"use client";

import { useState } from "react";
import { updateVenue } from "@/services/venue";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getSportTypes } from "@/services/sport";
import { useQuery } from "@tanstack/react-query";

function VenueEditDialog({ venue }) {
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: venue ? venue.name : "",
    size: venue ? venue.size : 0,
    sport_type_id: venue ? venue.sportTypes.id : 0,
    description: venue ? venue.description : "",
    photo: venue ? venue.photo : "",
  });
  console.log(updateData);
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
  console.log(data);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await updateVenue(venue.id, updateData);
    if (res.stats === 204) {
      setOpen(false);
      alert("Update Successful");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Venue</DialogTitle>
          <DialogDescription>
            Make changes to your venue here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              onChange={onChange}
              defaultValue={updateData.name}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="sport_type">Sport Type</Label>
            <Select
              defaultValue={updateData.sport_type_id.toString()}
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
            <Input
              id="size"
              type="number"
              defaultValue={updateData.size}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="size">Description</Label>
            <Textarea
              placeholder="Type your message here."
              id="description"
              onChange={onChange}
              defaultValue={updateData.description}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="size">Image</Label>
            <Input type="file" id="photo" onChange={onChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default VenueEditDialog;
