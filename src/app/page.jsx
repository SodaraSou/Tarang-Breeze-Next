import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSportTypes } from "@/services/sport";
import { getVenues } from "@/services/venue";
import UserLayout from "./UserLayout";
import FeatureSport from "@/components/FeatureSport";
import FeatureTeam from "@/components/FeatureTeam";
import FilterSearch from "@/components/FilterSearch";

async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["sportTypes"],
    queryFn: getSportTypes,
  });
  await queryClient.prefetchQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <div className="bg-white max-w-7xl h-[300px] justify-center flex flex-col items-center">
            <FilterSearch sportId={""}/>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <FeatureSport />
            <FeatureTeam />
          </HydrationBoundary>
        </div>
      </section>
    </UserLayout>
  );
}

export default HomePage;
