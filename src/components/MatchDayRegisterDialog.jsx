"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import { updateMatchGame } from "@/services/team";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function MatchDayRegisterDialog({ user, matchGame }) {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const router = useRouter();
  const checkLogin = (e) => {
    e.preventDefault();
    if (userProfile.status === 401) {
      router.push("/login");
    } else {
      setOpen(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.status !== 401) {
      const resMatchDay = await updateMatchGame(matchGame.id);
      if (resMatchDay.status === 204) {
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
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              variant="outline"
              className="bg-[#2ad5a5] text-white hover:text-black hover:bg-white"
              asChild
            >
              <Button>Ok</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={checkLogin}
            variant="outline"
            disabled={user[0].id === userProfile.data.id}
            className="w-full bg-[#2ad5a5] text-white cols-span-1 md:col-span-2 xl:col-span-1"
          >
            Challenge
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are your sure you want to challenge?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={onSubmit}
                variant="outline"
                className="bg-[#2ad5a5] hover:bg-white hover:text-black"
              >
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MatchDayRegisterDialog;
