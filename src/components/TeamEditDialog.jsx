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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { updateTeam } from "@/services/team";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getSportTypes } from "@/services/sport";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function TeamEditDialog({ team }) {
  const { data: sportTypes, isLoading: sportTypesLoading } = useQuery({
    queryKey: ["sportTypes"],
    queryFn: getSportTypes,
  });
  const [inputData, setInputData] = useState({
    name: team ? team.name : "",
    logo: team ? team.logo : "",
    sport_type_id: team ? team.sportType.id : 0,
  });
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "logo") {
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
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateTeam(team, inputData);
    if (res.status === 200) {
      setOpenAlertDialog(true);
      setAlertMessage("Team Update Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Team Update Failed");
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
          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription>
                Edit Team here. Click save when you're done.
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
                    <Label htmlFor="name">Team Name</Label>
                    <Input
                      id="name"
                      onChange={onChange}
                      defaultValue={inputData.name}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="sport_type">Sport Type</Label>
                    <Select
                      defaultValue={inputData.sport_type_id.toString()}
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
                          {sportTypesLoading ? (
                            <div>
                              <Spinner />
                            </div>
                          ) : (
                            <>
                              {sportTypes.data.sport_types.map((sport) => (
                                <SelectItem
                                  key={sport.id}
                                  value={sport.id.toString()}
                                >
                                  {sport.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
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
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
                  >
                    Save
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TeamEditDialog;
