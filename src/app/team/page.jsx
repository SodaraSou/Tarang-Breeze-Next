"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TabButton from "@/components/TabButton";
import TeamCard from "@/components/TeamCard";
import { IoFootballOutline } from "react-icons/io5";
import { GiShuttlecock } from "react-icons/gi";
import { TbPingPong } from "react-icons/tb";
import { PiVolleyball } from "react-icons/pi";
import UserLayout from "../UserLayout";

function TeamPage() {
  return (
    <UserLayout>
      <section className="p-10 xl:px-0">
        <h1 className="font-bold text-2xl md:text-4xl mb-10">Team</h1>
        <div className="flex justify-between">
          <div className="flex gap-4 mb-10">
            <TabButton
              svg={<IoFootballOutline className="w-4 h-4" />}
              label="Football"
            />
            <TabButton
              svg={<GiShuttlecock className="w-4 h-4" />}
              label="Badminton"
            />
            <TabButton
              svg={<TbPingPong className="w-4 h-4" />}
              label="Ping Pong"
            />
            <TabButton
              svg={<PiVolleyball className="w-4 h-4" />}
              label="Volleyball"
            />
          </div>
          <div>
            <Select onValueChange={null}>
              <SelectTrigger className=" border space-x-4 border-black rounded-full">
                <SelectValue placeholder="View By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recently">Recently</SelectItem>
                <SelectItem value="needOpponent">Need Opponent</SelectItem>
                <SelectItem value="needMember">Need Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </section>
    </UserLayout>
  );
}

export default TeamPage;
