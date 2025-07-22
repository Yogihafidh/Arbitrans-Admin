import { useQuery } from "@tanstack/react-query";
import { getRentalKendaraan } from "../../services/apiRental";

export function useAllRental() {
  const {
    data: rental,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["rental"],
    queryFn: getRentalKendaraan,
  });

  return { rental, error, isLoading };
}
