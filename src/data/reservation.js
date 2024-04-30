import { useQuery } from "@tanstack/react-query";
import {
  getReservation,
  getReservationWithPagination,
  getReservationWithPaginationPage,
} from "@/services/reservation";

export const useGetReservation = () => {
  return useQuery({
    queryFn: async () => getReservation(),
    queryKey: ["reservations"],
  });
};

export const useGetReservationWithPagination = (paginationUrl) => {
  if (paginationUrl) {
    return useQuery({
      queryFn: async () => getReservationWithPaginationPage(paginationUrl),
      queryKey: ["reservationsWithPagination"],
    });
  } else {
    return useQuery({
      queryFn: async () => getReservationWithPagination(),
      queryKey: ["reservationsWithPagination"],
    });
  }
};
