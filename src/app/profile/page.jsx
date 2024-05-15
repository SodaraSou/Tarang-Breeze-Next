import UserLayout from "../UserLayout";
import Profile from "@/components/Profile";
import Reservation from "@/components/Reservation";
import Team from "@/components/Team";
import UserProtectedRoute from "@/components/UserProtectedRoute";

async function ProfilePage() {
  return (
    <UserLayout>
      <section className="p-4 xl:p-10">
        <UserProtectedRoute>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 xl:gap-10">
            <Profile />
            <Reservation />
            <Team />
          </div>
        </UserProtectedRoute>
      </section>
    </UserLayout>
  );
}

export default ProfilePage;
