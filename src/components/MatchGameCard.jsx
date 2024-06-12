import { MapPin, Clock, Phone, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { acceptMatchGame, rejectMatchGame } from "@/services/team";

function MatchGameCard({ matchGame, user }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          {matchGame.users.length === 1 && (
            <CardTitle>{matchGame.users[0].name} vs Pending Team</CardTitle>
          )}
          {matchGame.users.length === 2 && (
            <CardTitle>
              {matchGame.users[0].name} vs {matchGame.users[1].name}
            </CardTitle>
          )}
          <div className="flex flex-col">
            <span className="text-center px-4 bg-red-500 rounded-t-lg text-white font-semibold">
              {format(matchGame.reservation.date, "MMMM")}
            </span>
            <span className="text-center px-4 bg-[#eaeaea] rounded-b-lg font-semibold">
              {format(matchGame.reservation.date, "dd")}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {matchGame.reservation.venue.name}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time: {matchGame.reservation.start_time} -{" "}
            {matchGame.reservation.end_time}
          </p>
          {matchGame.users.length === 2 ? (
            <>
              {user.data.id === matchGame.users[1].id &&
              matchGame.is_accepted === 0 ? (
                <>
                  <p className="flex items-center gap-2">
                    <Loader className="w-4 h-4" /> Pending Accept
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Host Contact (
                    {matchGame.users[0].phone})
                  </p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Challenger Contact (
                    {matchGame.users[1].phone})
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <p className="flex items-center gap-2">
                <Loader className="w-4 h-4" /> Await Opponent
              </p>
            </>
          )}
        </div>
      </CardContent>
      {matchGame.is_accepted === 0 &&
        matchGame.reservation.user.id === user.data.id &&
        matchGame.users.length === 2 && (
          <CardFooter>
            <div className="space-x-2 ml-auto">
              <Button
                variant="outline"
                className="bg-blue-500 text-white"
                onClick={() => acceptMatchGame(matchGame.id)}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                className="bg-red-500 text-white"
                onClick={() =>
                  rejectMatchGame(matchGame.id, matchGame.users[1].id)
                }
              >
                Reject
              </Button>
            </div>
          </CardFooter>
        )}
    </Card>
  );
}

export default MatchGameCard;
