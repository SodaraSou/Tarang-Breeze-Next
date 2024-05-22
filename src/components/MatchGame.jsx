"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getMatchGamesByUser } from "@/services/team";
import Spinner from "@/components/Spinner";

function MatchGame() {
  const { data, isLoading } = useQuery({
    queryKey: ["matchGamesByUser"],
    queryFn: getMatchGamesByUser,
  });
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Your Match Games</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <></>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default MatchGame;
