"use client";

import { useState } from "react";
import { acceptMatchGame } from "@/services/team";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Spinner from "@/components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function MatchGameAcceptDialog({ matchGameId }) {
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleAccept = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await acceptMatchGame(matchGameId);
    if (res.status === 204) {
      setOpenAlertDialog(true);
      setAlertMessage("Opponent Accept Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Opponent Accept Failed");
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
            variant="outline"
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
          >
            Accept
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {loading ? (
            <div className="flex justify-center p-10">
              <Spinner />
            </div>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will accept your opponent.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white hover:text-white"
                    onClick={handleAccept}
                  >
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MatchGameAcceptDialog;
