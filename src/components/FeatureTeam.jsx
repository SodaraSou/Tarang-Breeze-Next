"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservationWithPaginationPage } from "@/services/reservation";
import { getMatchGames } from "@/services/team";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamCard from "./TeamCard";
import Spinner from "@/components/Spinner";

function FeatureTeam() {
  const [paginationUrl, setPaginationUrl] = useState("/api/reservation");
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservationsWithPagination", paginationUrl],
    queryFn: () => getReservationWithPaginationPage(paginationUrl),
  });
  const { data: matchGames, isLoading: matchGamesLoading } = useQuery({
    queryKey: ["matchGames"],
    queryFn: getMatchGames,
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  console.log(matchGames);
  return (
    // <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
    //   <div className="w-full flex justify-between items-center my-6 md:my-0">
    //     <h1 className="font-semibold text-2xl leading-none tracking-tight">
    //       Feature Team
    //     </h1>
    //   </div>
    //   {isLoading || matchGamesLoading ? (
    //     <div className="flex justify-center items-center h-[450px]">
    //       <Spinner />
    //     </div>
    //   ) : (
    //     <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
    //       {matchGames.data
    //         .filter((matchGame) => !matchGame.team2)
    //         .map((matchGame, index) => (
    //           <TeamCard
    //             key={index}
    //             team={matchGame.team1}
    //             matchGame={matchGame}
    //           />
    //         ))}
    //     </div>
    //   )}
    // </div>
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Feature Teams</CardTitle>
      </CardHeader>
      <CardContent>
        {matchGamesLoading ? (
          <div className="flex justify-center items-center h-[450px]">
            <Spinner />
          </div>
        ) : (
          <>
            {matchGames.data.filter((matchGame) => !matchGame.team2).length ===
            0 ? (
              <div className="flex justify-center p-10">
                <h1 className="text-2xl font-semibold">No Teams</h1>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {matchGames.data
                  .filter((matchGame) => !matchGame.team2)
                  .map((matchGame, index) => (
                    <TeamCard
                      key={index}
                      team={matchGame.team1}
                      matchGame={matchGame}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default FeatureTeam;
