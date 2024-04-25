"use client";

import { Button } from "./ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function TournamentCard() {
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Name of the Tournament</CardTitle>
          <div className="flex flex-col">
            <span className="text-center px-4 bg-red-500 rounded-t-xl text-white">
              SEP
            </span>
            <span className="text-center px-4 bg-[#eaeaea] rounded-b-xl">
              30
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Place of the tournament
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Amount of people joined
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-4">
          <Button
            variant="outline"
            className="bg-[#2AD5A5] w-full rounded-xl text-white"
            onClick={() => {
              console.log("Button clicked!");
            }}
          >
            Join
          </Button>
          <Button
            variant="outline"
            className="bg-[#2AD5A5] w-full rounded-xl text-white"
          >
            Challenge
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TournamentCard;
