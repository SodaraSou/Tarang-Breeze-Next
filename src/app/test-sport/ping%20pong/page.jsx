import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import PingPongPrimaryBanner from "@/components/PingPongPrimaryBanner";
import FeatureTeam from "@/components/FeatureTeam";

export const metadata = {
  title: "Tarang | Ping Pong",
  description:
    "Join Tarang to find a Ping Pong team to play with or compete against. Discover venues to book for your matches and immerse yourself in the world of Ping Pong.",
};

function PingPongPage() {
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <FilterSearch sportId={9} />
          <PingPongPrimaryBanner />
          <FeatureTeam />
        </div>
      </section>
    </UserLayout>
  );
}

export default PingPongPage;
