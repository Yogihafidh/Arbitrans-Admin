import { useQuery } from "@tanstack/react-query";
import { getRentalKendaraan } from "../services/apiRental";
import { useSearchParams } from "react-router";
import { formatRentalData } from "../utils/helper";

export function useRental(statusFilter) {
  const [searchParams] = useSearchParams();
  const statusFromURL = searchParams.get("status");
  const status = statusFilter || statusFromURL || "Pending";

  // Filtering logic can be added here if needed
  const isFetchable = status === "Pending" || status === "Disewa";
  const filter = isFetchable
    ? { field: "kendaraan.status_kendaraan", value: status }
    : null;

  // Get Data
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: isFetchable ? ["rental", filter] : [],
    queryFn: () => getRentalKendaraan(filter),
    enabled: isFetchable,
    staleTime: 1000 * 60 * 5, // cache selama 5 menit
    refetchOnWindowFocus: false,
  });

  // Formating Data
  const rental = formatRentalData(data);

  return { rental, error, isLoading };
}
