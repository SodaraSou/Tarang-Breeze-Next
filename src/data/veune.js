import { useQuery } from "@tanstack/react-query";
import { getVenues, showSingleVenue } from "@/services/venue";

export const useGetVenues = () => {
  return useQuery({
    queryFn: async () => getVenues(),
    queryKey: ["venues"],
  });
};

export const useGetVenue = (venueId) => {
  return useQuery({
    queryFn: async () => showSingleVenue(venueId),
    queryKey: ["venue", venueId],
  });
};
