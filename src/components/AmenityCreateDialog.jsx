"use client";

import { useState } from "react";
import { createAmenity } from "@/services/amenity";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function AmenityCreateDialog() {
  const [inputData, setInputData] = useState({
    name: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createAmenity(inputData);
    if (res.status === 201) {
      setOpenAlertDialog(true);
      setAlertMessage("Amenity Create Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Amenity Create Failed");
      wait().then(() => setOpenAlertDialog(false));
    }
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Amenities</Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          {loading ? (
            <div className="flex justify-center p-10">
              <Spinner />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Create Amenities</DialogTitle>
                <DialogDescription>
                  Create your Amenities here. Click save when you're done.
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AmenityCreateDialog;
