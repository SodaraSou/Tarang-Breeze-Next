"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeamsByUser } from "@/services/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/Spinner";
import TeamCard from "@/components/TeamCard";

function Team() {
  const { data, isLoading } = useQuery({
    queryKey: ["teamsByUser"],
    queryFn: getTeamsByUser,
  });
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Team</CardTitle>
      </CardHeader>
      <CardContent>
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
                {data?.data.data.teams.map((team, index) => (
                  <TeamCard key={index} team={team} />
                ))}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Team;
