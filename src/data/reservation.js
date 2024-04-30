import { useQuery } from "@tanstack/react-query";
import { getReservation } from "@/services/reservation";

export const useGetReservation = () => {
  return useQuery({
    queryFn: async () => getReservation(),
    queryKey: ["reservations"],
  });
};
