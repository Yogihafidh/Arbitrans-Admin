import { useQuery } from "@tanstack/react-query";
import { getKendaraan } from "../services/apiKendaraan";
import { formatKendaraanData } from "../utils/helper";

export function useKendaraan() {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["kendaraan"],
    queryFn: () => getKendaraan(),
    staleTime: 1000 * 60 * 5, // cache selama 5 menit
    refetchOnWindowFocus: false,
  });

  const kendaraan = formatKendaraanData(data);

  return { kendaraan, error, isLoading };
}
