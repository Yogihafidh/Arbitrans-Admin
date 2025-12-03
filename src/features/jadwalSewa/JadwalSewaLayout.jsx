import { useKendaraanDisewaByDate } from "./useKendaraanDisewaByDate";
import DatePickerJadwaSewa from "./DatePickerJadwaSewa";
import KendaraanDisewaCard from "./KendaraanDisewaCard";
import KendaraanCardSkeleton from "../../ui/CardSkeletonLoading";
import EmptyMessage from "../../ui/EmptyMessage";

function JadwalSewaLayout() {
  const { kendaraanDisewaHariIni, isLoading } = useKendaraanDisewaByDate([
    "Disewa",
    "Lunas",
  ]);
  const cardTop = kendaraanDisewaHariIni.slice(0, 3);
  const cardButtom = kendaraanDisewaHariIni.slice(3);

  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr]">
        <DatePickerJadwaSewa />
        {isLoading && <KendaraanCardSkeleton count={3} />}
        {kendaraanDisewaHariIni.length !== 0 ? (
          <KendaraanDisewaCard data={cardTop} />
        ) : (
          <div className="flex items-center justify-center">
            {!isLoading && (
              <EmptyMessage
                heading="Tidak ada yang disewa"
                message="Tidak ada kendaraan yang disewa pada tanggal ini."
              />
            )}
          </div>
        )}
      </div>

      {kendaraanDisewaHariIni.length !== 0 && (
        <div>
          <KendaraanDisewaCard data={cardButtom} column="repeat(4, 1fr)" />
        </div>
      )}
    </>
  );
}

export default JadwalSewaLayout;
