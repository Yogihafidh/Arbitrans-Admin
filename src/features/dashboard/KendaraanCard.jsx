import { useKendaraanDisewaHariIni } from "./useKendaraanDisewaHariIni";
import Card from "../../ui/Card";
import KendaraanCardSkeleton from "../../ui/CardSkeletonLoading";

function KendaraanCard() {
  const { kendaraanDisewaHariIni, isLoading } = useKendaraanDisewaHariIni([
    "Disewa",
    "Telat",
  ]);

  if (isLoading) return <KendaraanCardSkeleton count={4} />;
  if (kendaraanDisewaHariIni.length === 0)
    return <p>Tidak ada kendaraan yang disewa hari ini</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {kendaraanDisewaHariIni.map((kendaraan) => (
        <Card data={kendaraan} key={kendaraan.id} isButtonShow={false} />
      ))}
    </div>
  );
}

export default KendaraanCard;
