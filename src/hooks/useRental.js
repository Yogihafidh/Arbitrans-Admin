import { useQuery } from "@tanstack/react-query";
import { getRentalKendaraan } from "../services/apiRental";
import { ALLOWED_STATUSES } from "../utils/Config";
import { formatRentalData } from "../utils/helper";

export function useRental(statusFilter) {
  // Pakai filter dari argumen atau dari URL
  const status = statusFilter ||  null;

  // Validation status
  const isValidStatus = (value) =>
    Array.isArray(value)
      ? value.every((item) => ALLOWED_STATUSES.includes(item))
      : ALLOWED_STATUSES.includes(value);
  const isFetchable = isValidStatus(status);

  // If valid re format
  const filter = isFetchable ? { field: "status", value: status } : null;

  // Get Data
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: isFetchable ? ["rental", "kendaraan", filter] : [],
    queryFn: () => getRentalKendaraan(filter),
    enabled: isFetchable,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Formating Data
  const rental = formatRentalData(data);

  return { rental, error, isLoading };
}
