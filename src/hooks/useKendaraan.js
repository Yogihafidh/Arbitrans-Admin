import { useQuery } from "@tanstack/react-query";
import { getKendaraan } from "../services/apiKendaraan";
import { formatKendaraanData } from "../utils/helper";

export function useKendaraan(status) {
  // Filtering logic can be added here if needed
  const filter = status ? { field: "status_kendaraan", value: status } : null;

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["kendaraan", filter],
    queryFn: () => getKendaraan(filter),
    staleTime: 1000 * 60 * 5, // cache selama 5 menit
    refetchOnWindowFocus: false,
  });

  const kendaraan = formatKendaraanData(data);

  return { kendaraan, error, isLoading };
}
