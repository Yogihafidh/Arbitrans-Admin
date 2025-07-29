import { useQuery } from "@tanstack/react-query";
import { getRentalKendaraan } from "../../services/apiRental";
import { useSearchParams } from "react-router";
import { formatRentalData } from "../../utils/helper";

export function useRental() {
  const [searchParams] = useSearchParams();

  // Filtering logic can be added here if needed
  const filterValue = searchParams.get("status") || "Tersedia";
  const filter = !filterValue
    ? null
    : { field: "kendaraan.status_kendaraan", value: filterValue };

  // Get Data
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["rental", filter],
    queryFn: () => getRentalKendaraan(filter),
  });

  // Formating Data
  const rental = formatRentalData(data);

  return { rental, error, isLoading };
}
