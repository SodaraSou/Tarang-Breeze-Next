"use client";

import { useState } from "react";
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGetSportTypes } from "@/data/sport";
import { searchAvailableTime } from "@/services/reservation";
import DatePicker from "./DatePicker";
import Spinner from "@/components/Spinner";
import VenueCard from "@/components/VenueCard";

function FilterSearch({ sportId }) {
  const { data } = useGetSportTypes();
  const [inputData, setInputData] = useState({
    date: "",
    start_time: "",
    duration: "",
    sport_type_id: sportId,
  });
  console.log(inputData);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (new Date(inputData.date) < new Date().setHours(0, 0, 0, 0)) {
      setAlertMessage("You can't choose a date before today.");
      setOpenAlertDialog(true);
      setLoading(false);
      return;
    }
    const res = await searchAvailableTime(inputData);
    if (res.status === 200) {
      setSearch(res.data.available_tarang);
    } else {
      setAlertMessage("All fields are required.");
      setOpenAlertDialog(true);
    }
    setLoading(false);
  };
  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Something Wrong While Searching</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="bg-white xl:p-24">
        <CardHeader align="center">
          <CardTitle>Reserve The Venue</CardTitle>
        </CardHeader>
        <CardContent align="center">
          <div className="max-w-5xl w-full bg-[#eaeaea] rounded-xl gap-4 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
            <DatePicker
              onDateChange={(date) => {
                const timezoneOffset = date.getTimezoneOffset() * 60000;
                const adjustedDate = new Date(date.getTime() - timezoneOffset);
                setInputData((prevState) => ({
                  ...prevState,
                  date: adjustedDate.toISOString(),
                }));
              }}
            />
            <Select
              onValueChange={(value) => {
                setInputData((prevState) => ({
                  ...prevState,
                  start_time: value,
                }));
              }}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Start Time" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <ScrollArea className="h-32">
                  <SelectGroup>
                    <SelectLabel>Start Time</SelectLabel>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 AM</SelectItem>
                    <SelectItem value="13:00">13:00 PM</SelectItem>
                    <SelectItem value="14:00">14:00 PM</SelectItem>
                    <SelectItem value="15:00">15:00 PM</SelectItem>
                    <SelectItem value="16:00">16:00 PM</SelectItem>
                    <SelectItem value="17:00">17:00 PM</SelectItem>
                    <SelectItem value="18:00">18:00 PM</SelectItem>
                    <SelectItem value="19:00">19:00 PM</SelectItem>
                    <SelectItem value="20:00">20:00 PM</SelectItem>
                    <SelectItem value="21:00">21:00 PM</SelectItem>
                    <SelectItem value="22:00">22:00 PM</SelectItem>
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {
                setInputData((prevState) => ({
                  ...prevState,
                  duration: value,
                }));
              }}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <ScrollArea className="h-32">
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="60">1 Hour</SelectItem>
                    <SelectItem value="120">2 Hours</SelectItem>
                    <SelectItem value="180">3 Hours</SelectItem>
                    <SelectItem value="240">4 Hours</SelectItem>
                    <SelectItem value="300">5 Hours</SelectItem>
                    <SelectItem value="360">6 Hours</SelectItem>
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
            <Select
              defaultValue={sportId.toString()}
              disabled={sportId}
              onValueChange={(id) => {
                setInputData((prevState) => ({
                  ...prevState,
                  sport_type_id: id,
                }));
              }}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select SportType" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <ScrollArea className="h-32">
                  <SelectGroup>
                    <SelectLabel>SportType</SelectLabel>
                    {data?.sport_types.map((sport) => (
                      <SelectItem key={sport.id} value={sport.id.toString()}>
                        {sport.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              className="cols-span-1 md:col-span-2 xl:col-span-1"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      {loading && search.length === 0 ? (
        <div className="flex justify-center mt-4 md:mt-10">
          <Spinner />
        </div>
      ) : (
        <div
          className={`${
            search.length > 0 ? "mt-4 md:mt-10" : ""
          } w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10`}
        >
          {search.map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>
      )}
    </>
  );
}

export default FilterSearch;
