"use client";

import { useQuery } from "@tanstack/react-query";
import { getMatchGames } from "@/services/team";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MatchGameCard from "@/components/MatchGameCard";
import Spinner from "@/components/Spinner";

function FeatureMatchGame() {
  const { data: matchGames, isLoading: matchGamesLoading } = useQuery({
    queryKey: ["matchGames"],
    queryFn: getMatchGames,
  });
  return (
    // <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
    //   <div className="w-full flex justify-between items-center my-6 md:my-0">
    //     <h1 className="font-semibold text-2xl leading-none tracking-tight">
    //       Feature Match Game
    //     </h1>
    //   </div>
    //   {matchGamesLoading ? (
    //     <div className="flex justify-center items-center h-[450px]">
    //       <Spinner />
    //     </div>
    //   ) : (
    //     <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
    //       {matchGames.data
    //         .filter(
    //           (matchGame) =>
    //             matchGame.team2 && matchGame.team1 && matchGame.is_accepted
    //         )
    //         .map((matchGame, index) => (
    //           <MatchGameCard key={index} matchGame={matchGame} />
    //         ))}
    //     </div>
    //   )}
    // </div>
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Feature Match Games</CardTitle>
      </CardHeader>
      <CardContent>
        {matchGamesLoading ? (
          <div className="flex justify-center items-center h-[450px]">
            <Spinner />
          </div>
        ) : (
          <>
            {matchGames.data.filter(
              (matchGame) =>
                matchGame.team2 && matchGame.team1 && matchGame.is_accepted
            ).length === 0 ? (
              <div className="flex justify-center p-10">
                <h1 className="text-2xl font-semibold">No Match Games</h1>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                {matchGames.data
                  .filter(
                    (matchGame) =>
                      matchGame.team2 &&
                      matchGame.team1 &&
                      matchGame.is_accepted
                  )
                  .map((matchGame, index) => (
                    <MatchGameCard key={index} matchGame={matchGame} />
                  ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default FeatureMatchGame;
