import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TeamDeleteDialog from "./TeamDeleteDialog";
import TeamEditDialog from "./TeamEditDialog";

function TeamCard({ team }) {
  return (
    <Card className="w-full md:w-auto bg-white">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={team.logo} />
          <AvatarFallback>{team.name}</AvatarFallback>
        </Avatar>
        <CardTitle>{team.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center gap-6">
        <TeamDeleteDialog teamId={team.id} />
        <TeamEditDialog team={team} />
      </CardFooter>
    </Card>
  );
}

export default TeamCard;
