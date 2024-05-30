"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAvailableTime } from "@/services/reservation";
import { getSportTypes } from "@/services/sport";
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
import DatePicker from "./DatePicker";
import Spinner from "@/components/Spinner";
import VenueCard from "@/components/VenueCard";

function FilterSearch({ sportId }) {
  const { data: sportTypes, isLoading } = useQuery({
    queryKey: ["sportTypes"],
    queryFn: getSportTypes,
  });
  console.log(sportTypes);
  const [inputData, setInputData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    sport_type_id: sportId,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    if (new Date(inputData.date) < new Date().setHours(0, 0, 0, 0)) {
      setAlertMessage("You can't choose a date before today.");
      setOpenAlertDialog(true);
      setLoading(false);
      return;
    }
    if (
      new Date(`2000-01-01T${inputData.start_time}`) >=
      new Date(`2000-01-01T${inputData.end_time}`)
    ) {
      setAlertMessage("End time must be after start time.");
      setOpenAlertDialog(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setIsSearch(true);
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
            <AlertDialogAction
              variant="outline"
              className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white cols-span-1 md:col-span-2 xl:col-span-1"
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="bg-white">
        <CardHeader align="center">
          <CardTitle>Reserve The Venue</CardTitle>
        </CardHeader>
        <CardContent align="center">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
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
                  end_time: value,
                }));
              }}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select End Time" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <ScrollArea className="h-32">
                  <SelectGroup>
                    <SelectLabel>End Time</SelectLabel>
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
                <SelectGroup>
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      {sportTypes.data.sport_types.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id.toString()}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              variant="outline"
              className="w-full bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white cols-span-1 md:col-span-2 xl:col-span-1"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      {loading ? (
        <Card className="bg-white flex justify-center mt-4 md:mt-10">
          <CardHeader>
            <Spinner />
          </CardHeader>
        </Card>
      ) : (
        <>
          {search.length > 0 ? (
            <Card
              className={`${search.length > 0 && "mt-4 md:mt-10"} bg-white`}
            >
              <CardHeader>
                <CardTitle>Available Venues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {search.map((venue, index) => (
                    <VenueCard
                      key={index}
                      venue={venue}
                      searchData={inputData}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            inputData.date !== "" &&
            inputData.start_time !== "" &&
            inputData.end_time !== "" &&
            inputData.sport_type_id !== "" &&
            isSearch && (
              <Card
                className={`${
                  inputData.date === null && search.length === 0
                    ? "hidden"
                    : "mt-4 md:mt-10 bg-white"
                }`}
              >
                <CardHeader className="text-center">
                  <CardTitle>No Venues Available</CardTitle>
                </CardHeader>
              </Card>
            )
          )}
        </>
      )}
    </>
  );
}

export default FilterSearch;
