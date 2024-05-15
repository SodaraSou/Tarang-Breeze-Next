"use client";

import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

function TeamCard({ team }) {
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Available for a match
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Accepting new members
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

export default TeamCard;
