"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getSportTypes } from "@/services/sport";
// import { IoFootballOutline } from "react-icons/io5";
// import { GiShuttlecock } from "react-icons/gi";
// import { TbPingPong } from "react-icons/tb";
// import { PiVolleyball } from "react-icons/pi";
import Spinner from "./Spinner";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

function FeatureSport() {
  const { data: sportTypes, isLoading } = useQuery({
    queryKey: ["allSportTypes"],
    queryFn: getSportTypes,
  });
  console.log(sportTypes);
  const sportIcons = [
    // <IoFootballOutline className="w-10 h-10" />,
    // <GiShuttlecock className="w-10 h-10" />,
    // <PiVolleyball className="w-10 h-10" />,
    // <PiVolleyball className="w-10 h-10" />,
    // <TbPingPong className="w-10 h-10" />,
    "/football_icon.png",
    "/badminton_icon.png",
    "/volleyball_icon.png",
    "/ping-pong_icon.png",
    "/ping-pong_icon.png",
  ];
  return (
    <div className="flex flex-col gap-4 md:gap-10 items-center">
      <h1 className="font-semibold text-center text-2xl tracking-tight leading-none my-6 md:my-0">
        Chose From your Favorite Sport
      </h1>
      {isLoading ? (
        <div className="p-10">
          <Spinner />
        </div>
      ) : sportTypes.data.sport_types.length > 0 ? (
        <div className="max-w-7xl flex flex-wrap justify-center gap-4 md:gap-10">
          {sportTypes.data.sport_types.map((sport, index) => (
            <Link key={index} href={`/sport/${sport.name.toLowerCase()}`}>
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex justify-center gap-4 items-center">
                    {/*{sportIcons[index]}*/}
                    <Image
                      src={sportIcons[index]}
                      alt={index}
                      width={32}
                      height={32}
                    />
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
