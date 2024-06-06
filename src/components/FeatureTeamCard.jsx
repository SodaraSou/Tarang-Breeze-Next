import { format } from "date-fns";
import { MapPin, Clock, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MatchDayRegisterDialog from "@/components/MatchDayRegisterDialog";

function FeatureTeamCard({ team, matchGame }) {
  return (
    <Card className="bg-white">
      <div className="relative">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={matchGame.match_game.team1.logo} />
            <AvatarFallback>{matchGame.match_game.team1.name}</AvatarFallback>
          </Avatar>
          <CardTitle>{matchGame.match_game.name}</CardTitle>
        </CardHeader>
        <div className="flex flex-col absolute right-6 top-6">
          <span className="text-center px-4 bg-red-500 rounded-t-lg text-white font-semibold">
            {format(matchGame.date, "MMMM")}
          </span>
          <span className="text-center px-4 bg-[#eaeaea] rounded-b-lg font-semibold">
            {format(matchGame.date, "dd")}
          </span>
        </div>
      </div>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {matchGame.venue.name}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time: {matchGame.start_time} - {matchGame.end_time}
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Available for a match
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <MatchDayRegisterDialog team={team} matchGame={matchGame} />
      </CardFooter>
    </Card>
  );
}

export default FeatureTeamCard;
