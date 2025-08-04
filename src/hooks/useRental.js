import { useQuery } from "@tanstack/react-query";
import { getRentalKendaraan } from "../services/apiRental";
import { useSearchParams } from "react-router";
import { formatRentalData } from "../utils/helper";

export function useRental(statusFilter) {
  // Get status from url if exist
  const [searchParams] = useSearchParams();
  const statusFromURL = searchParams.get("status");

  // Pakai filter dari argumen atau dari URL
  const status = statusFilter || statusFromURL || null;

  // Validation status
  const isValidStatus = (value) =>
    Array.isArray(value)
      ? value.every((item) => ["Disewa", "Pending"].includes(item))
      : ["Disewa", "Pending"].includes(value);
  const isFetchable = isValidStatus(status);

  // If valid re format
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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });


  // Formating Data
  const rental = formatRentalData(data);

  return { rental, error, isLoading };
}
