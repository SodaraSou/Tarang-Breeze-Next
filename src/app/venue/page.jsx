import BadmintonVenue from "@/components/BadmintonVenue";
import UserLayout from "../UserLayout";
import FootballVenue from "@/components/FootballVenue";
import PingPongVenue from "@/components/PingPongVenue";
import VolleyballVenue from "@/components/VolleyballVenue";

function VenuePage() {
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <div className="bg-white max-w-7xl h-[300px]"></div>
          <FootballVenue />
          <BadmintonVenue />
          <PingPongVenue />
          <VolleyballVenue />
        </div>
      </section>
    </UserLayout>
  );
}

export default VenuePage;
