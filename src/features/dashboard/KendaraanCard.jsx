import { useRental } from "../../hooks/useRental";
import Card from "../../ui/Card";

function KendaraanCard() {
  const { rental = [] } = useRental("Disewa");
  const kendaraanDisewa = rental?.filter(
    (kendaraan) => kendaraan.statusKendaraan === "Disewa",
  );

  // TODO: Loading
  if (kendaraanDisewa.length === 0) return <p>LOADING...</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {kendaraanDisewa.map((kendaraan) => (
        <Card data={kendaraan} key={kendaraan.id} isButtonShow={false} />
      ))}
    </div>
  );
}

export default KendaraanCard;
