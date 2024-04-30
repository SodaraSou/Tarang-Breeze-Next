import { getSportTypes } from "@/services/sport";
import { useQuery } from "@tanstack/react-query";

export function useGetSportTypes() {
  return useQuery({
    queryFn: async () => getSportTypes(),
    queryKey: ["sportTypes"],
  });
}
