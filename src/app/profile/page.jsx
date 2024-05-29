import UserLayout from "../UserLayout";
import Profile from "@/components/Profile";
import Reservation from "@/components/Reservation";
import Team from "@/components/Team";
import UserProtectedRoute from "@/components/UserProtectedRoute";
import MatchGame from "@/components/MatchGame";
import Link from "next/link";

async function ProfilePage() {
  return (
    <UserLayout>
        <section className="p-4 xl:p-10">
            {/*<UserProtectedRoute>*/}
            <div
                className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link href="#" className="font-semibold text-primary">Profile</Link>
                    <Link href="#">Reservation</Link>
                    <Link href="#">Team</Link>
                    <Link href="#">Match Game</Link>
                </nav>
                <div className="max-w-3xl mx-auto flex flex-col gap-4 xl:gap-10">
                    <Profile/>
                    <Reservation/>
                    <Team/>
                    <MatchGame/>
                </div>
            </div>
                {/*</UserProtectedRoute>*/}
        </section>
    </UserLayout>
);
}

export default ProfilePage;
