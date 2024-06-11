"use client";

import { useState } from "react";
import { createReservation } from "@/services/reservation";
import { createMatchGame } from "@/services/team";
import { getAllVenues } from "@/services/venue";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/services/user";
import { checkAvailableTime } from "@/services/reservation";
import DatePicker from "./DatePicker";
import Spinner from "@/components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function ReservationCreateDialog({ venue, triggerContent, searchData }) {
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
  const { data: venues, isLoading } = useQuery({
    queryKey: ["allVenues"],
    queryFn: getAllVenues,
  });
  const [value, setValue] = useState("");
  const [inputData, setInputData] = useState({
    phone: user.data.phone ? "+" + user.data.phone : "",
    attendee: 0,
    date: searchData ? searchData.date : "",
    start_time: searchData ? searchData.start_time : "",
    end_time: searchData ? searchData.end_time : "",
    venue_id: venue ? venue.id : 0,
  });
  const [teamOptions, setTeamOptions] = useState({
    find_team: false,
    find_member: false,
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    setTeamOptions((prevOptions) => ({
      ...prevOptions,
      [value]: checked,
    }));
  };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [checkTimeMessage, setCheckTimeMessage] = useState("");
  const [checkDateMessage, setCheckDateMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const isFormValid = () => {
    for (let field in inputData) {
      if (inputData[field] === "") {
        return false;
      }
    }
    return true;
  };
  // const handleOpt = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/api/verify-phone",
  //       { user_id: user.id, code: value },
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     return res;
  //     router.push("/");
  //   } catch (e) {
  //     console.log(e.response);
  //     return e.response;
  //   }
  // };
  const onSubmit = async () => {
    // e.preventDefault();
    setCheckTimeMessage("");
    setCheckDateMessage("");
    if (!isFormValid()) {
      setAlertMessage("Please fill out all fields.");
      setOpenAlertDialog(true);
      return;
    }
    if (new Date(inputData.date) < new Date().setHours(0, 0, 0, 0)) {
      setCheckDateMessage("You can't choose a date before today");
      return;
    }
    if (
      new Date(`2000-01-01T${inputData.start_time}`) >=
      new Date(`2000-01-01T${inputData.end_time}`)
    ) {
      setCheckTimeMessage("End time must be after start time.");
      return;
    }
    setLoading(true);
    if (user.status !== 401) {
      const response = await checkAvailableTime({
        date: inputData.date,
        start_time: inputData.start_time,
        end_time: inputData.end_time,
        venue_id: parseInt(inputData?.venue_id),
      });
      if (response.status !== 422) {
        if (!response.data.is_founded) {
          setLoading(false);
          setOpenAlertDialog(true);
          setAlertMessage("Time already reserved");
          wait().then(() => setOpenAlertDialog(false));
          return;
        }
      }
      // if (user.data.phone === null) {
      //   if (phoneNumber.startsWith("+")) {
      //     inputData.phone = phoneNumber.slice(1);
      //   } else {
      //     inputData.phone = phoneNumber;
      //   }
      //   const response = await updateUser({
      //     name: user.data.name,
      //     phone: inputData.phone,
      //     photo: user.data.photo || "https://github.com/shadcn.png",
      //   });
      //   if (response.status >= 400) {
      //     setOpenAlertDialog(true);
      //     setAlertMessage("Failed to update phone number");
      //     wait().then(() => setOpenAlertDialog(false));
      //     setLoading(false);
      //     return;
      //   } else {
      //     const res = await handleOpt();
      //     if (res.status >= 400) {
      //       setOpenAlertDialog(true);
      //       setAlertMessage("Failed to verfiy otp");
      //       wait().then(() => setOpenAlertDialog(false));
      //       setLoading(false);
      //       return;
      //     }
      //   }
      // }
      if (inputData.phone.startsWith("+")) {
        inputData.phone = inputData.phone.slice(1);
      } else {
        inputData.phone = inputData.phone;
      }
      if (teamOptions.find_member || teamOptions.find_team) {
        const reservation = { ...inputData, ...teamOptions };
        const res = await createReservation(reservation);
        if (res.status === 201) {
          await createMatchGame({
            reservation_id: res.data.id,
          });
          setOpenAlertDialog(true);
          setAlertMessage("Reservation Create Successfully");
          wait().then(() => setOpenAlertDialog(false));
        } else {
          setOpenAlertDialog(true);
          setAlertMessage("Reservation Create Failed");
          wait().then(() => setOpenAlertDialog(false));
        }
        setOpen(false);
        setLoading(false);
        return;
      }
      const res = await createReservation({ ...inputData, ...teamOptions });
      if (res.status === 201) {
        setOpenAlertDialog(true);
        setAlertMessage("Reservation Create Successfully");
        wait().then(() => setOpenAlertDialog(false));
      } else {
        setOpenAlertDialog(true);
        setAlertMessage("Reservation Create Failed");
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
      {/* <Dialog open={openOtp} onOpenChange={setOpenOtp}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-4xl">OTP</DialogTitle>
            <DialogDescription>
              Enter the 6 digit code sent to your phone number {phoneNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button
              onClick={handleOpt}
              type="submit"
              variant="outline"
              className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      {/* Alert Dialog */}
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
      {/*Create Reservation Dialog*/}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="bg-white">
          {loading ? (
            <div className="flex justify-center p-10">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <DialogHeader>
                <DialogTitle>Create Reservation</DialogTitle>
                <DialogDescription>
                  Create your reservation here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="name">Venue</Label>
                  <Select
                    defaultValue={inputData.venue_id.toString()}
                    disabled
                    onValueChange={(id) => {
                      setInputData((prevState) => ({
                        ...prevState,
                        venue_id: id,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <ScrollArea className="h-32">
                        <SelectGroup>
                          <SelectLabel>Venue</SelectLabel>
                          {isLoading ? (
                            <div className="flex justify-center py-4">
                              <Spinner />
                            </div>
                          ) : (
                            <>
                              {venues.data.venues.map((venue) => (
                                <SelectItem
                                  key={venue.id}
                                  value={venue.id.toString()}
                                >
                                  {venue.name} - {venue.sport_type.name}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Date</Label>
                    <DatePicker
                      onValue={inputData.date}
                      onDateChange={(date) => {
                        setInputData((prevState) => ({
                          ...prevState,
                          date: date.toISOString(),
                        }));
                      }}
                      disabled={searchData.date}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {checkDateMessage}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="name">Start Time</Label>
                      <Select
                        defaultValue={inputData.start_time
                          .replace(" AM", "")
                          .replace(" PM", "")}
                        onValueChange={(value) => {
                          setInputData((prevState) => ({
                            ...prevState,
                            start_time: value,
                          }));
                        }}
                        disabled={searchData.start_time}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <ScrollArea className="h-32">
                            <SelectGroup>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 AM</SelectItem>
                              <SelectItem value="13:00">13:00 PM</SelectItem>
                              <SelectItem value="14:00">14:00 PM</SelectItem>
                              <SelectItem value="15:00">15:00 PM</SelectItem>
                              <SelectItem value="16:00">16:00 PM</SelectItem>
                              <SelectItem value="17:00">17:00 PM</SelectItem>
                              <SelectItem value="18:00">18:00 PM</SelectItem>
                              <SelectItem value="19:00">19:00 PM</SelectItem>
                              <SelectItem value="20:00">20:00 PM</SelectItem>
                              <SelectItem value="21:00">21:00 PM</SelectItem>
                              <SelectItem value="22:00">22:00 PM</SelectItem>
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="name">End Time</Label>
                      <Select
                        defaultValue={inputData.end_time
                          .replace(" AM", "")
                          .replace(" PM", "")}
                        onValueChange={(value) => {
                          setInputData((prevState) => ({
                            ...prevState,
                            end_time: value,
                          }));
                        }}
                        disabled={searchData.end_time}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <ScrollArea className="h-32">
                            <SelectGroup>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 AM</SelectItem>
                              <SelectItem value="13:00">13:00 PM</SelectItem>
                              <SelectItem value="14:00">14:00 PM</SelectItem>
                              <SelectItem value="15:00">15:00 PM</SelectItem>
                              <SelectItem value="16:00">16:00 PM</SelectItem>
                              <SelectItem value="17:00">17:00 PM</SelectItem>
                              <SelectItem value="18:00">18:00 PM</SelectItem>
                              <SelectItem value="19:00">19:00 PM</SelectItem>
                              <SelectItem value="20:00">20:00 PM</SelectItem>
                              <SelectItem value="21:00">21:00 PM</SelectItem>
                              <SelectItem value="22:00">22:00 PM</SelectItem>
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {checkTimeMessage}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  {/* <Input
                    type="text"
                    id="phone"
                    onChange={onChange}
                    className="rounded-lg"
                    defaultValue={inputData.phone}
                    disabled={user.data.phone}
                  /> */}
                  <PhoneInput
                    id="phone"
                    onChange={onChange}
                    className="rounded-lg"
                    international
                    defaultCountry="KH"
                    value={inputData.phone}
                    disabled={user.data.phone}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="name">Number of Player</Label>
                  <Input
                    type="number"
                    id="attendee"
                    onChange={onChange}
                    className="rounded-lg"
                    defaultValue={inputData.attendee}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Optional</Label>
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      onChange={handleCheck}
                      checked={teamOptions.find_team}
                      type="checkbox"
                      value="find_team"
                      id="find_team"
                      name="find_team"
                    />
                    <label htmlFor="find_team">
                      Find a team to play against
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-[#2ad5a5] text-white"
                >
                  Confirm Reservation
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReservationCreateDialog;
