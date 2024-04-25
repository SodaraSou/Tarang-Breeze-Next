"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getSportTypes } from "@/services/sport";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { IoFootballOutline } from "react-icons/io5";
import { GiShuttlecock } from "react-icons/gi";
import { TbPingPong } from "react-icons/tb";
import { PiVolleyball } from "react-icons/pi";
import Spinner from "./Spinner";

function FeatureSport() {
  const { data: sportTypeData, isLoading: sportTypeLoading } = useQuery({
    queryKey: ["getSportTypesKey"],
    queryFn: getSportTypes,
  });
  const sportIcons = [
    <IoFootballOutline className="w-10 h-10" />,
    <GiShuttlecock className="w-10 h-10" />,
    <PiVolleyball className="w-10 h-10" />,
    <PiVolleyball className="w-10 h-10" />,
    <TbPingPong className="w-10 h-10" />,
  ];
  return (
    <div className="flex flex-col gap-4 md:gap-10 items-center">
      <h1 className="font-bold text-center text-2xl md:text-4xl my-6 md:my-0">
        Chose From your Favorite Sport
      </h1>
      {sportTypeLoading ? (
        <div className="p-10">
          <Spinner />
        </div>
      ) : !sportTypeLoading &&
        sportTypeData &&
        sportTypeData.sport_types.length > 0 ? (
        <div className="max-w-[1120px] flex flex-wrap justify-center gap-4 md:gap-10">
          {sportTypeData.sport_types.map((sport, index) => (
            <Link key={index} href={`/sport/${sport.name}`}>
              <Card className="bg-white rounded-xl">
                <CardHeader>
                  <div className="flex justify-center gap-4 items-center">
                    {sportIcons[index]}
                    <CardTitle className="hidden md:block">
                      {sport.name}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold p-10">No Sport</h2>
        </div>
      )}
    </div>
  );
}

export default FeatureSport;
