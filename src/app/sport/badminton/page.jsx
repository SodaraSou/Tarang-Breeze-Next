import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import BadmintonPrimaryBanner from "@/components/BadmintonPrimaryBanner";
import FeatureTeam from "@/components/FeatureTeam";

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
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <FilterSearch sportId={2} />
          <BadmintonPrimaryBanner />
          <FeatureTeam sport="badminton" />
        </div>
      </section>
    </UserLayout>
  );
}

export default BadmintonPage;
