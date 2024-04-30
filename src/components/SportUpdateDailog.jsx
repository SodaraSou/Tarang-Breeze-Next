"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateSport } from "@/services/sport";

function SportUpdateDailog({sport}) {
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState({
      name: sport ? sport.name : "",
    });
    const onChange = (e) => {
      e.preventDefault();
        setUpdateData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      const res = await updateSport(sport, updateData);
      if (res.status === 204) {
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

export default SportUpdateDailog