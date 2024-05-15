"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeamsByUser } from "@/services/team";
import Spinner from "@/components/Spinner";
import TeamCard from "@/components/TeamCard";

function Team() {
  const { data, isLoading } = useQuery({
    queryKey: ["teamsByUser"],
    queryFn: getTeamsByUser,
  });
  return (
    <div className="flex flex-col gap-4 justify-center items-center border border-gray-200 bg-white shadow p-4 md:p-10 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl md:text-4xl">Team</h1>
      </div>
      <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      ) : (
        <>
          {data?.data.data.teams.length === 0 ? (
            <div className="flex justify-center p-10">
              <h1 className="text-2xl font-semibold">No Team</h1>
            </div>
          ) : (
            <>
              {data?.data.data.teams?.map((team, index) => (
                <TeamCard key={index} team={team} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Team;
