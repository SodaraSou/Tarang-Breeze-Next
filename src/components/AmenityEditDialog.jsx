"use client";

import { useState } from "react";
import { editAmenity } from "@/services/amenity";
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

function AmenityEditDialog({ amenity }) {
  const [updateData, setUpdateData] = useState({
    name: amenity ? amenity.name : "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setUpdateData((prevState) => ({
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
    const res = await editAmenity(amenity, updateData);
    if (res.status === 204) {
      setOpenAlertDialog(true);
      setAlertMessage("Amenity Update Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Amenity Update Failed");
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
          <Button variant="outline" className="bg-blue-500 text-white">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Amenity</DialogTitle>
              <DialogDescription>
                Make changes to your Amenity here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            {loading ? (
              <div className="flex justify-center p-10">
                <Spinner />
              </div>
            ) : (
              <>
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
              </>
            )}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AmenityEditDialog;
