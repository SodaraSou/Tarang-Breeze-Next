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
  SelectLabel,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getSportTypes } from "@/services/sport";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function VenueCreateDialog() {
  const [inputData, setInputData] = useState({
    name: "",
    size: 0,
    sport_type_id: 0,
    description: "",
    amenity_id: [],
    photo: "",
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
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const updatedAmenities = [...inputData.amenity_id];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    setInputData((prev) => ({
      ...prev,
      amenity_id: updatedAmenities,
    }));
  };
  const { data } = useQuery({
    queryKey: ["SportTypes"],
    queryFn: async () => await getSportTypes(),
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createVenue(inputData);
    if (res.status === 204) {
      setOpenAlertDialog(true);
      setAlertMessage("Venue Create Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Venue Create Failed");
      wait().then(() => setOpenAlertDialog(false));
    }
    setOpen(false);
    setLoading(false);
  };
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  return (
    <>
      {/* Alert Dialog */}
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
      {/* Create Venue Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
          >
            Create Venue
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Create Venue</DialogTitle>
              <DialogDescription>
                Create your venue here. Click save when you're done.
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
                    <Input id="name" onChange={onChange} required />
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
                          {data?.sport_types.map((sport) => (
                            <SelectItem
                              key={sport.id}
                              value={sport.id.toString()}
                            >
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
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="size">Description</Label>
                    <Textarea
                      placeholder="Type your message here."
                      id="description"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="amenities">Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_parking"
                          name="amenities"
                          value={1}
                          className="mr-2"
                          checked={inputData.amenity_id.includes("1")}
                          onChange={handleAmenitiesChange}
                          required
                        />
                        <label htmlFor="amenity_wifi">Parking</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_drinking_water"
                          name="amenities"
                          value={2}
                          className="mr-2"
                          checked={inputData.amenity_id.includes("2")}
                          onChange={handleAmenitiesChange}
                          required
                        />
                        <label htmlFor="amenity_kitchen">Drinking Water</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_first_aid"
                          name="amenities"
                          value={3}
                          className="mr-2"
                          checked={inputData.amenity_id.includes("3")}
                          onChange={handleAmenitiesChange}
                          required
                        />
                        <label htmlFor="amenity_washer_dryer">First Aid</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_rest_room"
                          name="amenities"
                          value={4}
                          className="mr-2"
                          checked={inputData.amenity_id.includes("4")}
                          onChange={handleAmenitiesChange}
                          required
                        />
                        <label htmlFor="amenity_free_parking">
                          Free Parking
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="size">Image</Label>
                    <Input type="file" id="photo" onChange={onChange} />
                  </div>
                </div>
              </>
            )}
            <DialogFooter>
              <Button
                type="submit"
                variant="outline"
                className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VenueCreateDialog;
