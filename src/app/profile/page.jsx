import UserLayout from "../UserLayout";
import Profile from "@/components/Profile";
import Reservation from "@/components/Reservation";
import Team from "@/components/Team";

function ProfilePage() {
  return (
    <UserLayout>
      <section className="p-4 xl:p-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 xl:gap-10">
          <Profile />
          <Reservation />
          <Team />
        </div>
      </section>
    </UserLayout>
  );
}

export default ProfilePage;
