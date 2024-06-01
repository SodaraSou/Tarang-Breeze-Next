"use client";

import UserLayout from "../UserLayout";
import Profile from "@/components/Profile";
import Reservation from "@/components/Reservation";
import Team from "@/components/Team";
import UserProtectedRoute from "@/components/UserProtectedRoute";
import MatchGame from "@/components/MatchGame";
import { useState } from "react";
import { User, LandPlot, ShieldHalf, Clock } from "lucide-react";

async function ProfilePage() {
  const [section, setSection] = useState("Profile");

  let selectedComponent;
  switch (section) {
    case "Profile":
      selectedComponent = <Profile />;
      break;
    case "Reservation":
      selectedComponent = <Reservation />;
      break;
    case "Team":
      selectedComponent = <Team />;
      break;
    case "Match Game":
      selectedComponent = <MatchGame />;
      break;
    default:
      selectedComponent = <Profile />;
  }
  return (
    <UserLayout>
      <section className="flex min-h-[calc(100vh_-_theme(spacing.32))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 justify-items-start text-muted-foreground">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSection("Profile");
              }}
              className={`flex gap-2 items-center ${
                section === "Profile" ? "font-semibold" : ""
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSection("Reservation");
              }}
              className={`flex gap-2 items-center ${
                section === "Reservation" ? "font-semibold" : ""
              }`}
            >
              <LandPlot className="w-4 h-4" />
              Reservation
            </button>
            <button
              type="button"
              onClick={() => setSection("Team")}
              className={`flex gap-2 items-center${
                section === "Team" ? "font-semibold" : ""
              }`}
            >
              <ShieldHalf className="w-4 h-4" />
              Team
            </button>
            <button
              type="button"
              onClick={() => setSection("Match Game")}
              className={`flex gap-2 items-center ${
                section === "Match Game" ? "font-semibold" : ""
              }`}
            >
              <Clock className="w-4 h-4" />
              Match Game
            </button>
          </nav>
          <div className="grid gap-6 xl:gap-10">{selectedComponent}</div>
        </div>
      </section>
    </UserLayout>
  );
}

export default ProfilePage;
