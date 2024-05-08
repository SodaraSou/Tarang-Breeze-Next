"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import UserLayout from "../UserLayout";
import Profile from "@/components/Profile";
import Reservation from "@/components/Reservation";
import Team from "@/components/Team";

function ProfilePage() {
  const { logout, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <UserLayout>
      <section className="p-4 xl:p-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 xl:gap-10">
          <Profile user={user} logout={logout} />
          <Reservation />
          <Team />
        </div>
      </section>
    </UserLayout>
  );
}

export default ProfilePage;
