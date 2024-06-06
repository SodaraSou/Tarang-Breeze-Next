import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import PingPongPrimaryBanner from "@/components/PingPongPrimaryBanner";
import PingPongSecondaryBanner from "@/components/PingPongSecondaryBanner";
import FeatureTeam from "@/components/FeatureTeam";
import FeatureVenue from "@/components/FeatureVenue";

export const metadata = {
  title: "Tarang | Ping Pong",
  description:
    "Join Tarang to find a Ping Pong team to compete against. Discover venues to book for your matches and immerse yourself in the world of Ping Pong.",
  keywords:
    "Tarang, Tarang Cambodia, Tarang Ping Pong, Tarang Best Ping Pong Venue Reservation Website In Cambodia",
};

function PingPongPage() {
  return (
    <UserLayout>
      <div className="w-full h-[480px] relative">
        <div
          className="w-full h-[420px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homebanners.png')" }}
        ></div>
        <div className="w-full absolute bottom-0">
          <div className="max-w-7xl mx-auto p-4 md:px-6 xl:px-0">
            <FilterSearch sportId={5} />
          </div>
        </div>
      </div>
      <div className="space-y-10 mt-10">
        <div div className="bg-white">
          <PingPongPrimaryBanner />
        </div>
        <div>
          <FeatureVenue sport={5} />
        </div>
        <div>
          <FeatureTeam sportId={5} />
        </div>
      </div>
    </UserLayout>
  );
}

export default PingPongPage;
