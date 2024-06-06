"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { createTeam, updateMatchGame } from "@/services/team";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function MatchDayRegisterDialog({ team, matchGame }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
  const [matchGameData, setMatchGameData] = useState({
    is_accepted: false,
    team1_id: matchGame.match_game.team1 ? matchGame.match_game.team1.id : 0,
    team2_id: matchGame.match_game.team2 ? matchGame.match_game.team2.id : 0,
    reservation_id: matchGame ? matchGame.id : 0,
  });
  const [teamData, setTeamData] = useState({
    name: "",
    logo: "",
    sport_type_id: matchGame ? matchGame.venue.sport_type.id : 0,
  });
  const onChangeTeam = (e) => {
    e.preventDefault();
    if (e.target.id === "logo") {
      setTeamData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files[0],
      }));
    } else {
      setTeamData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  const [checkCreateTeam, setCheckCreateTeam] = useState(false);
  const handleCheck = (e) => {
    setCheckCreateTeam(e.target.checked);
  };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const router = useRouter();
  const checkLogin = (e) => {
    e.preventDefault();
    if (user.status === 401) {
      router.push("/login");
    }
    // else if (user.data.phone === null) {
    //   console.log("no phone number");
    // }
    else {
      setOpen(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.status !== 401) {
      if (matchGameData.team2_id === 0) {
        const resTeam = await createTeam(teamData);
        matchGameData.team2_id = resTeam.data.id;
        const resMatchDay = await updateMatchGame(matchGame.id, matchGameData);
        if (resMatchDay.status === 201) {
          setOpenAlertDialog(true);
          setAlertMessage("Match Game Request Successfully");
          wait().then(() => setOpenAlertDialog(false));
        } else {
          setOpenAlertDialog(true);
          setAlertMessage("Match Game Request Failed");
          wait().then(() => setOpenAlertDialog(false));
        }
        setOpen(false);
        setLoading(false);
        return;
      }
      const resMatchDay = await updateMatchGame(matchGame.id, matchGameData);
      if (resMatchDay.status === 201) {
        setOpenAlertDialog(true);
        setAlertMessage("Match Game Request Successfully");
        wait().then(() => setOpenAlertDialog(false));
      } else {
        setOpenAlertDialog(true);
        setAlertMessage("Match Game Request Failed");
        wait().then(() => setOpenAlertDialog(false));
      }
      setOpen(false);
      setLoading(false);
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("You are Unauthenticated");
      wait().then(() => setOpenAlertDialog(false));
    }
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={checkLogin}
            disabled={
              matchGameData.team1_id !== 0 && matchGameData.team2_id !== 0
            }
            variant="outline"
            className="w-full bg-[#2ad5a5] text-white cols-span-1 md:col-span-2 xl:col-span-1"
          >
            Challenge
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          {loading || isLoading ? (
            <div className="flex justify-center p-10">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle>Challenge Request</DialogTitle>
                <DialogDescription>
                  Create your challenge request here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                {user.data.teams?.length === 0 ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Team Name</Label>
                      <Input
                        type="data"
                        id="name"
                        className="rounded-lg"
                        onChange={onChangeTeam}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="size">Image</Label>
                      <Input type="file" id="logo" onChange={onChangeTeam} />
                    </div>
                  </>
                ) : (
                  <>
                    <Select
                      disabled={checkCreateTeam}
                      onValueChange={(id) => {
                        setMatchGameData((prevState) => ({
                          ...prevState,
                          team2_id: parseInt(id),
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <ScrollArea className="h-32">
                          <SelectGroup>
                            <SelectLabel>Team</SelectLabel>
                            {user.data.teams?.map((team) => (
                              <SelectItem
                                key={team.id}
                                value={team.id.toString()}
                              >
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        onChange={handleCheck}
                        checked={checkCreateTeam}
                        type="checkbox"
                        value="create_team"
                        id="create_team"
                        name="default-checkbox"
                      />
                      <label htmlFor="find_team">Create New Team</label>
                    </div>
                    {checkCreateTeam && (
                      <>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name">Team Name</Label>
                          <Input
                            type="data"
                            id="name"
                            className="rounded-lg"
                            onChange={onChangeTeam}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label htmlFor="size">Image</Label>
                          <Input
                            type="file"
                            id="logo"
                            onChange={onChangeTeam}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <DialogFooter>
                <Button
                  disabled={user.data.id === matchGame.user.id}
                  type="submit"
                  variant="outline"
                  className="bg-[#2ad5a5] text-white"
                >
                  Challenge
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MatchDayRegisterDialog;
