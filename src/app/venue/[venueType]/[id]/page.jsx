"use client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getVenues, showSingleVenue } from "@/services/venue";
import UserLayout from "@/app/UserLayout";
import Venue from "@/components/Venue";

async function SingleVenuePage({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["venue", params.id],
    queryFn: () => showSingleVenue(params.id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  return (
    <UserLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Venue venueId={params.id} />
      </HydrationBoundary>
    </UserLayout>
  );
}

export default SingleVenuePage;
