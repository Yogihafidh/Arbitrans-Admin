import { useQuery } from "@tanstack/react-query";
import { getRentalKendaraan } from "../../services/apiRental";
import { useSearchParams } from "react-router";

export function useAllRental() {
  const [searchParams] = useSearchParams();

  // Filtering logic can be added here if needed
  const filterValue = searchParams.get("status") || "Tersedia";
  const filter = !filterValue
    ? null
    : { field: "kendaraan.status_kendaraan", value: filterValue };

  const {
    data: rental,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["rental", filter],
    queryFn: () => getRentalKendaraan(filter),
  });

  return { rental, error, isLoading };
}
