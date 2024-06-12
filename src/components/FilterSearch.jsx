"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DatePicker from "./DatePicker";
import Spinner from "@/components/Spinner";

function FilterSearch({ sportId }) {
  const { data: sportTypes, isLoading } = useQuery({
    queryKey: ["sportTypes"],
    queryFn: getSportTypes,
  });
  const [inputData, setInputData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    sport_type_id: sportId,
  });
  const [alertDateMessage, setAlertDateMessage] = useState("");
  const [alertTimeMessage, setAlertTimeMessage] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const { toast } = useToast();
  const isFormValid = () => {
    for (let field in inputData) {
      if (inputData[field] === "") {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    setAlertDateMessage("");
    setAlertTimeMessage("");
    setOpenToast(false);
    if (
      new Date(`2000-01-01T${inputData.start_time}`) >=
      new Date(`2000-01-01T${inputData.end_time}`)
    ) {
      setAlertTimeMessage("End time must be after start time.");
      setOpenToast(true);
    }
  }, [inputData.start_time, inputData.end_time, inputData.date]);
  useEffect(() => {
    if (openToast) {
      toast({
        variant: "destructive",
        description: alertTimeMessage,
      });
    }
  }, [openToast, toast, alertTimeMessage]);
  return (
    <>
      <Card className="bg-white">
        <CardHeader align="center">
          <CardTitle>Reserve The Venue</CardTitle>
        </CardHeader>
        <CardContent align="center">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
            <div>
              <DatePicker
                onDateChange={(date) => {
                  const timezoneOffset = date.getTimezoneOffset() * 60000;
                  const adjustedDate = new Date(
                    date.getTime() - timezoneOffset
                  );
                  setInputData((prevState) => ({
                    ...prevState,
                    date: adjustedDate.toISOString(),
                  }));
                }}
              />
              <p className="text-left text-xs">{alertDateMessage}</p>
            </div>
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
            <div>
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
            </div>
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
            {alertTimeMessage || !isFormValid() ? (
              <Button
                variant="outline"
                className="w-full bg-[#2ad5a5] text-white cols-span-1 md:col-span-2 xl:col-span-1"
                disabled
              >
                Search
              </Button>
            ) : (
              <Link
                href={{
                  pathname: "/search-result",
                  query: { ...inputData },
                }}
                asChild
              >
                <Button
                  variant="outline"
                  className="w-full bg-[#2ad5a5] text-white cols-span-1 md:col-span-2 xl:col-span-1"
                >
                  Search
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default FilterSearch;
