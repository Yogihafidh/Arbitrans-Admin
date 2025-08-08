import DatePickerJadwaSewa from "../features/jadwalSewa/DatePickerJadwaSewa";
import KendaraanDisewaCard from "../features/jadwalSewa/KendaraanDisewaCard";
import { useKendaraanDisewaByDate } from "../features/jadwalSewa/useKendaraanDisewaByDate";

function JadwalSewa() {
  const { kendaraanDisewaHariIni, isLoading } = useKendaraanDisewaByDate([
    "Disewa",
    "Telat",
    "Pending",
  ]);
  const cardTop = kendaraanDisewaHariIni.slice(0, 3);
  const cardButtom = kendaraanDisewaHariIni.slice(3);

  if (isLoading) return <p>LOADING...</p>;

  return (
    <div>
      <div className="mb-4 grid grid-cols-[auto_1fr] gap-4">
        <DatePickerJadwaSewa />
        {kendaraanDisewaHariIni.length !== 0 ? (
          <KendaraanDisewaCard data={cardTop} column="repeat(3, 1fr)" />
        ) : (
          <p>Tidak ada kendaraan yang disewa pada tanggal ini.</p>
        )}
      </div>

      {kendaraanDisewaHariIni.length !== 0 && (
        <div>
          <KendaraanDisewaCard data={cardButtom} column="repeat(4, 1fr)" />
        </div>
      )}
    </div>
  );
}

export default JadwalSewa;
