"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGetSportTypes } from "@/data/sport";
import DatePicker from "./DatePicker";

function FilterSearch({ sportId }) {
  const { data } = useGetSportTypes();
  const router = useRouter();
  const [inputData, setInputData] = useState({
    date: "",
    start_time: "",
    duration: "",
    sport_types_id: sportId,
  });
  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/venue");
  };
  return (
    <Card className="bg-white xl:p-24">
      <CardHeader align="center">
        <CardTitle>Reserve The Venue</CardTitle>
      </CardHeader>
      <CardContent align="center">
        <div className="max-w-5xl w-full bg-[#eaeaea] rounded-xl gap-4 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
          <DatePicker
            // onValue={inputData.date}
            onDateChange={(date) => {
              setInputData((prevState) => ({
                ...prevState,
                date: date.toISOString(),
              }));
            }}
          />
          <Select
            // defaultValue={inputData.venue_id.toString()}
            // disabled={isUser}
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
            // defaultValue={inputData.venue_id.toString()}
            // disabled={isUser}
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
                sport_types_id: id,
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
  );
}

export default FilterSearch;
