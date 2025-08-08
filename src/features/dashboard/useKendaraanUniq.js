import { useRental } from "../../hooks/useRental";

export function useKendaraanDisewaHariIni(status) {
  const { rental, isLoading } = useRental(status);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const kendaraanDisewaHariIni = rental.filter((item) => {
    const mulai = new Date(item.tanggalMulai);
    const akhir = new Date(item.tanggalAkhir);

    mulai.setHours(0, 0, 0, 0);
    akhir.setHours(0, 0, 0, 0);

    return today >= mulai && today <= akhir;
  });

  return { kendaraanDisewaHariIni, isLoading };
}
