"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getReservationWithPaginationPage } from "@/services/reservation";
import {
  getMatchGames,
  getMatchGamesBySport,
  getMatchGamesWithPagination,
} from "@/services/team";
import { getReservationWithPagination } from "@/services/reservation";
import FeatureTeamCard from "./FeatureTeamCard";
import Spinner from "@/components/Spinner";

function FeatureTeam({ sportId }) {
  if (sportId !== 0) {
    const [paginationUrl, setPaginationUrl] = useState(
      `/api/match-games?type=${sportId}`
    );
    const { data: matchGames, isLoading: matchGamesLoading } = useQuery({
      queryKey: ["matchGames", paginationUrl],
      queryFn: () => getMatchGamesBySport(paginationUrl),
    });
    const handlePaginationChange = (url) => {
      setPaginationUrl(url);
    };
    console.log(matchGames);
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
              {matchGames.data.data.filter(
                (matchGame) => matchGame.users.length === 1
              ).length === 0 ? (
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
                    .filter((matchGame) => matchGame.users.length === 1)
                    .map((matchGame, index) => (
                      <FeatureTeamCard
                        key={index}
                        user={matchGame.users}
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
  const [paginationUrl, setPaginationUrl] = useState(
    `/api/match-games?type=${parseInt(1)}`
  );
  const { data: matchGames, isLoading: matchGamesLoading } = useQuery({
    queryKey: ["matchGames", paginationUrl],
    queryFn: () => getMatchGamesBySport(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  console.log(matchGames);
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
            {matchGames.data.data.filter(
              (matchGame) => matchGame.users.length === 1
            ).length === 0 ? (
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
                  .filter((matchGame) => matchGame.users.length === 1)
                  .map((matchGame, index) => (
                    <FeatureTeamCard
                      key={index}
                      user={matchGame.users}
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
