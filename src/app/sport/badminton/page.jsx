import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import BadmintonPrimaryBanner from "@/components/BadmintonPrimaryBanner";
import BadmintonSecondaryBanner from "@/components/BadmintonSecondaryBanner";
import FeatureTeam from "@/components/FeatureTeam";
import FeatureVenue from "@/components/FeatureVenue";

export const metadata = {
  title: "Tarang | Badminton",
  description:
    "Join Tarang to find a badminton team to compete against. Discover venues to book for your matches and immerse yourself in the world of Badminton.",
  keywords:
    "Tarang, Tarang Cambodia, Tarang Badminton, Tarang Best Badminton Venue Reservation Website In Cambodia",
};

function BadmintonPage() {
  return (
    <UserLayout>
      <div className="w-full h-[480px] relative">
        <div
          className="w-full h-[420px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homebanners.png')" }}
        ></div>
        <div className="w-full absolute bottom-0">
          <div className="max-w-7xl mx-auto p-4 md:px-6 xl:px-0">
            <FilterSearch sportId={2} />
          </div>
        </div>
      </div>
      <div className="space-y-10 mt-10">
        <div div className="bg-white">
          <BadmintonPrimaryBanner />
        </div>
        <div>
          <FeatureVenue sport={2} pagination={true} />
        </div>
        <div>
          <FeatureTeam sportId={2} pagination={true} />
        </div>
      </div>
    </UserLayout>
  );
}

export default BadmintonPage;
