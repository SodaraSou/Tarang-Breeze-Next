import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";
import FootballPrimaryBanner from "@/components/FootballPrimaryBanner";
import FootballSecondaryBanner from "@/components/FootballSecondaryBanner";
import BadmintonPrimaryBanner from "@/components/BadmintonPrimaryBanner";
import BadmintonSecondaryBanner from "@/components/BadmintonSecondaryBanner";
import VolleyballPrimaryBanner from "@/components/VolleyballPrimaryBanner";
import VolleyballSecondaryBanner from "@/components/VolleyballSecondaryBanner";
import PingPongPrimaryBanner from "@/components/PingPongPrimaryBanner";
import PingPongSecondaryBanner from "@/components/PingPongSecondaryBanner";
import FeatureTeam from "@/components/FeatureTeam";

function SingleSportTypePage({ params }) {
  const { id } = params;
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <FilterSearch sportId={id} />
          {id === "1" && (
            <>
              <FootballPrimaryBanner />
              <FootballSecondaryBanner />
              <FeatureTeam />
            </>
          )}
          {id === "2" && (
            <>
              <BadmintonPrimaryBanner />
              <BadmintonSecondaryBanner />
              <FeatureTeam />
            </>
          )}
          {id === "3" && (
            <>
              <VolleyballPrimaryBanner />
              <VolleyballSecondaryBanner />
              <FeatureTeam />
            </>
          )}
          {id === "9" && (
            <>
              <PingPongPrimaryBanner />
              <PingPongSecondaryBanner />
              <FeatureTeam />
            </>
          )}
        </div>
      </section>
    </UserLayout>
  );
}

export default SingleSportTypePage;
