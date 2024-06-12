import { format } from "date-fns";
import { MapPin, Clock, CheckCircle, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MatchDayRegisterDialog from "@/components/MatchDayRegisterDialog";

function FeatureTeamCard({ user, matchGame }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{user[0].name}</CardTitle>
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
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Available for a match
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> Host Contact: +{user[0].phone}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <MatchDayRegisterDialog user={user} matchGame={matchGame} />
      </CardFooter>
    </Card>
  );
}

export default FeatureTeamCard;
