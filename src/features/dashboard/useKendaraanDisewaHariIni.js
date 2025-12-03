import { isBefore, isWithinInterval, startOfDay } from "date-fns";
import { useRental } from "../../hooks/useRental";

export function useKendaraanDisewaHariIni(status) {
  const { rental, isLoading } = useRental(status);

  const today = startOfDay(new Date());

  const kendaraanDisewaHariIni = rental.filter((item) => {
    const mulai = startOfDay(new Date(item.tanggalMulai));
    const akhir = startOfDay(new Date(item.tanggalAkhir));

    // Data yang masih dalam masa sewa atau masih berstatus "Disewa" walau tanggal akhir sudah lewat
        const masihDisewa =
          isWithinInterval(today, { start: mulai, end: akhir }) ||
          (isBefore(akhir, today) && (item.status === "Disewa" || item.status === "Lunas"));

    return masihDisewa;
  });

  return { kendaraanDisewaHariIni, isLoading };
}
