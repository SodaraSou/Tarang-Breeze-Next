import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getVenues } from "@/services/venue";
import { getSportTypes } from "@/services/sport";
import VenueTable from "@/components/VenueTable";
import SportTypeTable from "@/components/SportTypeTable";

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
      <SportTypeTable />
    </HydrationBoundary>
  );
}

export default VenuePage;
