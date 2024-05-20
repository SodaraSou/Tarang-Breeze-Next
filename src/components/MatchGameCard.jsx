import { MapPin, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
function MatchGameCard({ matchGame }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={matchGame.team1.logo} />
              <AvatarFallback>{matchGame.team1.name}</AvatarFallback>
            </Avatar>
            <CardTitle>{matchGame.team1.name}</CardTitle>
          </div>
          <CardTitle>VS</CardTitle>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={matchGame.team2.logo} />
              <AvatarFallback>{matchGame.team2.name}</AvatarFallback>
            </Avatar>
            <CardTitle>{matchGame.team2.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {matchGame.reservation.venue.name}
          </p>
          <div className="flex justify-between">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date: {format(matchGame.reservation.date, "PPP")}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time: {matchGame.reservation.start_time} -{" "}
              {matchGame.reservation.end_time}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MatchGameCard;
