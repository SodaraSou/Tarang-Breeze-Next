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
import { createSport } from "@/services/sport";

function SportCreateDailog() {
  
  const [inputData, setUpdateData] = useState({
    name: "",
  });
  const onChange = (e) => {
    e.preventDefault();
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await createSport(inputData);
    if (res.status === 204) {
        alert("Success Fully Created")
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create SportTypes</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Sport Types</DialogTitle>
          <DialogDescription>
            Create your Sport Types here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" onChange={onChange} />
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

export default SportCreateDailog

