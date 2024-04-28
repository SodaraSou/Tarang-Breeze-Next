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
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function VenueCreateDialog() {
  const [updateData, setUpdateData] = useState({
    name: "",
    size: 0,
    sport_type_id: 0,
    description: "",
    photo: "",
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
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", updateData.photo);
    formData.append("name", updateData.name);
    formData.append("sport_type_id", updateData.sport_type_id);
    formData.append("description", updateData.description);
    formData.append("size", updateData.size);
    await createVenue(formData);
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
                  <SelectItem value="1">Football</SelectItem>
                  <SelectItem value="2">Badminton</SelectItem>
                  <SelectItem value="3">Volleyball</SelectItem>
                  <SelectItem value="4">Ping Pong</SelectItem>
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
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default VenueCreateDialog;