import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import VolleyballPrimaryBanner from "@/components/VolleyballPrimaryBanner";
import FeatureTeam from "@/components/FeatureTeam";

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
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <FilterSearch sportId={3} />
          <VolleyballPrimaryBanner />
          <FeatureTeam />
        </div>
      </section>
    </UserLayout>
  );
}

export default VolleyballPage;
