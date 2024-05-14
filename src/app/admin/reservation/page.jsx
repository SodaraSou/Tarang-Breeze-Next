import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getReservation } from "@/services/reservation";
import { getVenues } from "@/services/venue";
import Calendar from "@/components/Calendar";
import ReservationTable from "@/components/ReservationTable";

async function ReservationPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  await queryClient.prefetchQuery({
    queryKey: ["reservations"],
    queryFn: getReservation,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Calendar />
      <ReservationTable />
    </HydrationBoundary>
  );
}

export default ReservationPage;
