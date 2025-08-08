import { isWithinInterval, parseISO, startOfDay } from "date-fns";
import { useRental } from "../../hooks/useRental";
import { useSearchParams } from "react-router";

export function useKendaraanDisewaByDate(status) {
  // Get parameter from URL
  const [searchparams] = useSearchParams();
  const date = searchparams.get("date");

  // Parse ke Date object, default ke hari ini kalau null
  const selectedDate = startOfDay(date ? parseISO(date) : new Date());

  // Get rental data
  const { rental, isLoading } = useRental(status);

  // Di filter
  const kendaraanDisewaHariIni = rental.filter((item) =>
    isWithinInterval(selectedDate, {
      start: startOfDay(new Date(item.tanggalMulai)),
      end: startOfDay(new Date(item.tanggalAkhir)),
    }),
  );

  return { kendaraanDisewaHariIni, isLoading };
}
