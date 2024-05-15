"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useGetReservation } from "@/data/reservation";
import AdminReservationCreateDialog from "@/components/AdminReservationCreateDialog";
import TournamentCard from "./TournamentCard";

function Calendar() {
  const { data } = useGetReservation();
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }, []);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankDaysArray = [];
    const daysArray = [];

    for (let i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };
  return (
    <>
      {/* {isLoading ? (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      ) : ( */}
      <div className="antialiased sans-serif bg-gray-100">
        <div>
          <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
            <div className="flex items-center justify-between py-2 px-6">
              <div>
                <span className="text-lg font-bold text-gray-800">
                  {MONTH_NAMES[month]}
                </span>
                <span className="ml-1 text-lg text-gray-600 font-normal">
                  {year}
                </span>
              </div>
              <div
                className="border rounded-lg px-1"
                style={{ paddingTop: "2px" }}
              >
                <button
                  type="button"
                  className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center ${
                    month === 0 ? "cursor-not-allowed opacity-25" : ""
                  }`}
                  disabled={month === 0}
                  onClick={() => {
                    setMonth(month - 1);
                    getNoOfDays();
                  }}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex leading-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeLidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div className="border-r inline-flex h-6"></div>
                <button
                  type="button"
                  className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ${
                    month === 11 ? "cursor-not-allowed opacity-25" : ""
                  }`}
                  disabled={month === 11}
                  onClick={() => {
                    setMonth(month + 1);
                    getNoOfDays();
                  }}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex leading-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeLidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap">
                {DAYS.map((day, index) => (
                  <div
                    key={index}
                    style={{ width: "14.26%" }}
                    className="px-2 py-2"
                  >
                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="-mx-1 -mb-1">
              <div className="flex flex-wrap border-t border-l">
                {blankDays.map((blankday, index) => (
                  <div
                    key={index}
                    style={{ width: "14.28%", height: "120px" }}
                    className="text-center border-r border-b px-4 pt-2"
                  ></div>
                ))}
                {noOfDays.map((date, dateIndex) => (
                  <div
                    key={dateIndex}
                    style={{ width: "14.28%", height: "120px" }}
                    className="px-4 pt-2 border-r border-b relative"
                  >
                    {new Date().setHours(0, 0, 0, 0) >
                    new Date(year, month, date) ? (
                      <>{date}</>
                    ) : (
                      <AdminReservationCreateDialog
                        date={new Date(year, month, date)}
                        triggerContent={
                          <div
                            className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                              isToday(date)
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-blue-200"
                            }`}
                          >
                            {date}
                          </div>
                        }
                      />
                    )}
                    <div style={{ height: "80px" }} className=" mt-1">
                      <Sheet>
                        <SheetTrigger className="h-full w-full">
                          {data.filter(
                            (reservation) =>
                              new Date(reservation.date).toDateString() ===
                              new Date(year, month, date).toDateString()
                          ).length > 0 && (
                            <>
                              {
                                data.filter(
                                  (reservation) =>
                                    new Date(
                                      reservation.date
                                    ).toDateString() ===
                                    new Date(year, month, date).toDateString()
                                ).length
                              }{" "}
                              Reservation
                            </>
                          )}
                        </SheetTrigger>
                        <SheetContent className="flex flex-col gap-4 max-w-[400px] sm:max-w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Reservations</SheetTitle>
                          </SheetHeader>
                          <div className="flex flex-col gap-4 overflow-y-auto h-full">
                            {data
                              .filter(
                                (reservation) =>
                                  new Date(reservation.date).toDateString() ===
                                  new Date(year, month, date).toDateString()
                              )
                              .map((reservation, index) => (
                                <TournamentCard
                                  key={index}
                                  reservation={reservation}
                                />
                              ))}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Calendar;
