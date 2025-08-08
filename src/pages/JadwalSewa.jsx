import DatePickerJadwaSewa from "../features/jadwalSewa/DatePickerJadwaSewa";
import KendaraanDisewaCard from "../features/jadwalSewa/KendaraanDisewaCard";
import { useRental } from "../hooks/useRental";

function JadwalSewa() {
  const { rental, isLoading } = useRental("Disewa");
  if (isLoading) return <p>LOADING...</p>;
  if (rental.length === 0)
    return <p>Tidak ada kendaraan yang disewa hari ini</p>;

  const cardTop = rental.slice(0, 3);
  const cardButtom = rental.slice(3);

  return (
    <div>
      <div className="mb-4 grid grid-cols-[auto_1fr] gap-4">
        <DatePickerJadwaSewa />
        <KendaraanDisewaCard data={cardTop} column="repeat(3, 1fr)" />
      </div>
      <div>
        <KendaraanDisewaCard data={cardButtom} column="repeat(4, 1fr)" />
      </div>
    </div>
  );
}

export default JadwalSewa;
