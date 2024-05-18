import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

function TeamCard({ team }) {
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={team.logo} />
          <AvatarFallback>{team.name}</AvatarFallback>
        </Avatar>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Available for a match
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white cols-span-1 md:col-span-2 xl:col-span-1"
        >
          Challenge
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TeamCard;
