import { useRental } from "../../hooks/useRental";
import Card from "../../ui/Card";

function KendaraanCard() {
  const { rental = [] } = useRental("Disewa");
  const kendaraanDisewa = rental?.filter(
    (kendaraan) => kendaraan.statusKendaraan === "Disewa",
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      {kendaraanDisewa.map((kendaraan) => (
        <Card data={kendaraan} key={kendaraan.id} isButtonShow={false} />
      ))}
    </div>
  );
}

export default KendaraanCard;
