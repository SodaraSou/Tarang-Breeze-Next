import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getVenues } from "@/services/venue";
import { getSportTypes } from "@/services/sport";
import VenueTable from "@/components/VenueTable";

async function VenuePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  await queryClient.prefetchQuery({
    queryKey: ["sportTypes"],
    queryFn: getSportTypes,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VenueTable />
    </HydrationBoundary>
  );
}

export default VenuePage;
