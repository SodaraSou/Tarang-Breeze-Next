import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import FootballPrimaryBanner from "@/components/FootballPrimaryBanner";
import FeatureTeam from "@/components/FeatureTeam";

export const metadata = {
  title: "Tarang | Football",
  description:
    "Join Tarang to find a football team to play with or compete against. Discover venues to book for your matches and immerse yourself in the world of football.",
};

function FootballPage() {
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <FilterSearch sportId={1} />
          <FootballPrimaryBanner />
          <FeatureTeam />
        </div>
      </section>
    </UserLayout>
  );
}

export default FootballPage;
