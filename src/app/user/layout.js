"use client";

import Link from "next/link";
import { Clock, LandPlot, ShieldHalf, User } from "lucide-react";
import { usePathname } from "next/navigation";
import UserProtectedRoute from "@/components/UserProtectedRoute";
import UserLayout from "@/app/UserLayout";

export default function Layout({ children }) {
  const pathName = usePathname();
  return (
    <UserProtectedRoute>
      <UserLayout>
        <section className="flex min-h-[calc(100vh_-_theme(spacing.32))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">
              {pathName === "/user" && "Profile"}
              {pathName === "/user/reservation" && "Reservation"}
              {pathName === "/user/team" && "Team"}
              {pathName === "/user/match-game" && "Match Game"}
            </h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 justify-items-start text-muted-foreground">
              <Link
                href="/user"
                className={
                  pathName === "/user"
                    ? "font-semibold flex items-center gap-2"
                    : "flex items-center gap-2 text-gray-400 hover:text-black hover:font-semibold"
                }
              >
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link
                href="/user/reservation"
                className={
                  pathName === "/user/reservation"
                    ? "font-semibold flex items-center gap-2"
                    : "flex items-center gap-2 text-gray-400 hover:text-black hover:font-semibold"
                }
              >
                <LandPlot className="w-4 h-4" /> Reservation
              </Link>
              <Link
                href="/user/team"
                className={
                  pathName === "/user/team"
                    ? "font-semibold flex items-center gap-2"
                    : "flex items-center gap-2 text-gray-400 hover:text-black hover:font-semibold"
                }
              >
                <ShieldHalf className="w-4 h-4" /> Team
              </Link>
              <Link
                href="/user/match-game"
                className={
                  pathName === "/user/match-game"
                    ? "font-semibold flex items-center gap-2"
                    : "flex items-center gap-2 text-gray-400 hover:text-black hover:font-semibold"
                }
              >
                <Clock className="w-4 h-4" /> Match Game
              </Link>
            </nav>
            <div className="grid gap-6 xl:gap-10">{children}</div>
          </div>
        </section>
      </UserLayout>
    </UserProtectedRoute>
  );
}
