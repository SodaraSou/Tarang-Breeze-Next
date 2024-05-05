"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
  } from "@/components/ui/select";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Button } from "@/components/ui/button";
  import DatePicker from "./DatePicker";
  import { useGetSportTypes } from "@/data/sport";
  import { useState } from "react";

function FilterSearch({sportId}) {
    const { data } = useGetSportTypes();

    const [inputData, setInputData] = useState({
        date: "",
        start_time: "",
        duration: "",
        sport_types_id: "",
      });
  return (
    <div className="flex flex-col gap-4 items-center">
        <div><h1 className="text-2xl font-bold">Reserve The Venue</h1></div>
        <div className='w-[800px] bg-[#eaeaea] rounded-xl gap-4 p-4 flex'>
        <div>
              <DatePicker
                // onValue={inputData.date}
                onDateChange={(date) => {
                  setInputData((prevState) => ({
                    ...prevState,
                    date: date.toISOString(),
                  }));
                }}
              />
            </div>
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
                <SelectTrigger className='bg-white'>
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
                <SelectTrigger className='bg-white'>
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <ScrollArea className="h-32">
                    <SelectGroup>
                      <SelectLabel>Duration</SelectLabel>
                      <SelectItem value='60'>1 Hour</SelectItem>
                      <SelectItem value='120'>2 Hours</SelectItem>
                      <SelectItem value='180'>3 Hours</SelectItem>
                      <SelectItem value='240'>4 Hours</SelectItem>
                      <SelectItem value='300'>5 Hours</SelectItem>
                      <SelectItem value='360'>6 Hours</SelectItem>
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
                <SelectTrigger className='bg-white'>
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
            <Button>Search</Button>
        </div>
    </div>
  )
}

export default FilterSearch