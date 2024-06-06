import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import VolleyballPrimaryBanner from "@/components/VolleyballPrimaryBanner";
import VolleyballSecondaryBanner from "@/components/VolleyballSecondaryBanner";
import FeatureTeam from "@/components/FeatureTeam";
import FeatureVenue from "@/components/FeatureVenue";

export const metadata = {
  title: "Tarang | Volleyball",
  description:
    "Join Tarang to find a Volleyball team to compete against. Discover venues to book for your matches and immerse yourself in the world of Volleyball.",
  keywords:
    "Tarang, Tarang Cambodia, Tarang Volleyball, Tarang Best Volleyball Venue Reservation Website In Cambodia",
};

function VolleyballPage() {
  return (
    <UserLayout>
      <div className="w-full h-[480px] relative">
        <div
          className="w-full h-[420px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homebanners.png')" }}
        ></div>
        <div className="w-full absolute bottom-0">
          <div className="max-w-7xl mx-auto p-4 md:px-6 xl:px-0">
            <FilterSearch sportId={3} />
          </div>
        </div>
      </div>
      <div className="space-y-10 mt-10">
        <div div className="bg-white">
          <VolleyballPrimaryBanner />
        </div>
        <div>
          <FeatureVenue sport={3} />
        </div>
        <div>
          <FeatureTeam sportId={3} />
        </div>
      </div>
    </UserLayout>
  );
}

export default VolleyballPage;
