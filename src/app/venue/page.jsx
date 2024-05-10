import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import UserLayout from "../UserLayout";
import FilterSearch from "@/components/FilterSearch";
import SearchVenue from "@/components/SearchVenue";
import { getVenues } from "@/services/venue";

async function VenuePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <FilterSearch sportId="" />
            <SearchVenue />
          </HydrationBoundary>
        </div>
      </section>
    </UserLayout>
  );
}

export default VenuePage;
