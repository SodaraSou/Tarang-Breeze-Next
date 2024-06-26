"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { createTeam } from "@/services/team";

export function DialogTeam() {
  const [inputData, setInputData] = useState({
    name: "",
    sport_type_id: 0,
    logo: "",
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

  const Submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", inputData.logo);
    formData.append("name", inputData.name);
    formData.append("sport_type_id", inputData.sport_type_id);
    createTeam(formData);
    alert("Succesfully Add!");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
       <Button className="bg-green-300" variant="outline">
         Create Team
       </Button>
       </DialogTrigger>
     <DialogContent className="sm:max-w-[425px] bg-white">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-2xl md:text-2xl font-bold">Create New Team</h1>
          <form
            encType="multipart/form-data"
            onSubmit={Submit}
            className="flex flex-col gap-10 items-center w-full"
          >
            <div className="flex flex-col w-full gap-4">
            <label htmlFor="category" className="text-sm md:text-base">
                  Team Name
                </label>
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Name"
                    id={"name"}
                    onChange={onChange}
                  />
                </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="category" className="text-sm md:text-base">
                  Sport Type
                </label>
                <Select  onValueChange={(value) => {
                    setInputData((prevState) => ({
                      ...prevState,
                      sport_type_id : value,
                    }));
                  }}
                  required>
                  <SelectTrigger >
                    <SelectValue placeholder="Select Sport Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup
                      className="bg-white"
                      
                    >
                      <SelectItem value="1">Football</SelectItem>
                      <SelectItem value="2">Badminton</SelectItem>
                      <SelectItem value="3">Ping Pong</SelectItem>
                      <SelectItem value="4">Volleyball</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="w-full flex flex-col gap-2">
                <label className="text-sm md:text-base" htmlFor="#">
                  Comment
                </label>
                <Textarea
                  placeholder="Type your message here."
                  id="description"
                  onChange={onChange}
                />
              </div> */}
              <div>
              <label htmlFor="category" className="text-sm md:text-base">
                  Logo
                </label>
                <Input
                  type="file"
                  title={"image"}
                  id={"logo"}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <DialogFooter>
                <Button
                  className="bg-green-300 rounded-xl"
                  variant="outline"
                  type="submit"
                >
                   Create Team
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
       </DialogContent>
    </Dialog>
  );
}
export default DialogTeam;
