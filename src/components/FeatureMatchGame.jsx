"use client";

import { useQuery } from "@tanstack/react-query";
import { getMatchGames } from "@/services/team";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MatchGameCard from "@/components/MatchGameCard";
import Spinner from "@/components/Spinner";
import Image from "next/image";

function FeatureMatchGame() {
  const { data: matchGames, isLoading: matchGamesLoading } = useQuery({
    queryKey: ["matchGames"],
    queryFn: getMatchGames,
  });
  return (
    <Card className="bg-white border-none">
      <CardHeader>
        <CardTitle>Feature Match Games</CardTitle>
      </CardHeader>
      <CardContent>
        {matchGamesLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <>
            {matchGames.data.data.filter(
              (matchGame) =>
                matchGame.team2 && matchGame.team1 && matchGame.is_accepted
            ).length === 0 ? (
              <div className="flex justify-center items-center gap-4 p-10">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
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
