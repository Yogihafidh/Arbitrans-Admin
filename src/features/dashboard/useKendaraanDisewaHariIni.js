import { isBefore, isWithinInterval, startOfDay } from "date-fns";
import { useRental } from "../../hooks/useRental";

export function useKendaraanDisewaHariIni(status) {
  const { rental, isLoading } = useRental(status);

  const today = startOfDay(new Date());

  const kendaraanDisewaHariIni = rental.filter((item) => {
    const mulai = startOfDay(new Date(item.tanggalMulai));
    const akhir = startOfDay(new Date(item.tanggalAkhir));

    // Data yang masih dalam masa sewa
    const masihDisewa = isWithinInterval(today, { start: mulai, end: akhir });

    // Data yang sudah lewat tapi status Telat
    const telat = isBefore(akhir, today) && item.status === "Telat";

    return masihDisewa || telat;
  });

  return { kendaraanDisewaHariIni, isLoading };
}
