import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import FootballPrimaryBanner from "@/components/FootballPrimaryBanner";
import FootballSecondaryBanner from "@/components/FootballSecondaryBanner";
import FeatureTeam from "@/components/FeatureTeam";
import FeatureVenue from "@/components/FeatureVenue";

export const metadata = {
  title: "Tarang | Football",
  description:
    "Join Tarang to find a football team to compete against. Discover venues to book for your matches and immerse yourself in the world of football.",
  keywords:
    "Tarang, Tarang Cambodia, Tarang Football, Tarang Best Football Venue Reservation Website In Cambodia",
};

function FootballPage() {
  return (
    <UserLayout>
      <div className="w-full h-[480px] relative">
        <div
          className="w-full h-[420px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homebanners.png')" }}
        ></div>
        <div className="w-full absolute bottom-0">
          <div className="max-w-7xl mx-auto p-4 md:px-6 xl:px-0">
            <FilterSearch sportId={1} />
          </div>
        </div>
      </div>
      <div className="space-y-10 mt-10">
        <div className="bg-white">
          <FootballPrimaryBanner />
        </div>
        <div>
          <FeatureVenue sport={1} pagination={true} />
        </div>
        <div>
          <FeatureTeam sportId={1} pagination={true} />
        </div>
      </div>
    </UserLayout>
  );
}

export default FootballPage;
