import Card from "../../ui/Card";
import { useKendaraanDisewaHariIni } from "./useKendaraanDisewaHariIni";

function KendaraanCard() {
  const { kendaraanDisewaHariIni, isLoading } = useKendaraanDisewaHariIni([
    "Disewa",
    "Telat",
  ]);

  // TODO: Loading
  if (isLoading) return <p>LOADING...</p>;
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
