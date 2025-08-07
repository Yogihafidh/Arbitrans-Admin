import { useQuery } from "@tanstack/react-query";

import { getKendaraanTersediaHariIni as getKendaraanTersediaHariIniApi } from "../../services/apiKendaraan";
import { formatKendaraanData } from "../../utils/helper";

export function useKendaraanTersedia() {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["kendaraan"],
    queryFn: getKendaraanTersediaHariIniApi,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const kendaraanTersedia = formatKendaraanData(data);

  return { kendaraanTersedia, error, isLoading };
}
