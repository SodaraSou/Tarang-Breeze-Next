"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getReservationWithPaginationPage } from "@/services/reservation";
import { getMatchGames, getMatchGamesWithPagination } from "@/services/team";
import TeamCard from "./TeamCard";
import Spinner from "@/components/Spinner";
import Image from "next/image";

function FeatureTeam({ sport }) {
  const { data: matchGames, isLoading: matchGamesLoading } = useQuery({
    queryKey: ["matchGames"],
    queryFn: getMatchGames,
  });
  const [paginationUrl, setPaginationUrl] = useState(
    `/api/match-games?type=${sport}`
  );
  const { data, isLoading } = useQuery({
    queryKey: ["matchGameTeams", paginationUrl],
    queryFn: () => getMatchGamesWithPagination(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
      <h1 className="text-2xl font-semibold mb-4">Feature Teams</h1>
      <div>
        {matchGamesLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <>
            {matchGames.data.data.filter((matchGame) => !matchGame.team2)
              .length === 0 ? (
              <div className="flex justify-center items-center gap-4 p-10">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Teams</h1>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {matchGames.data.data
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
      </div>
    </div>
  );
}

export default FeatureTeam;
