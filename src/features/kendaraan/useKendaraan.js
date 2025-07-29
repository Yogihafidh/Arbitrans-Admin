import { useQuery } from "@tanstack/react-query";
import { getKendaraan } from "../../services/apiRental";
import { formatKendaraanData } from "../../utils/helper";

export function useKendaraan() {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["rental"],
    queryFn: () => getKendaraan(),
  });

  const kendaraan = formatKendaraanData(data);

  return { kendaraan, error, isLoading };
}
