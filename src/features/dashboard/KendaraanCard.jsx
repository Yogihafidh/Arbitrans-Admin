import { useRental } from "../../hooks/useRental";
import Card from "../../ui/Card";

function KendaraanCard() {
  const { rental = [], isLoading } = useRental(["Disewa", "Telat"]);

  // TODO: Loading
  if (isLoading) return <p>LOADING...</p>;
  if (rental.length === 0)
    return <p>Tidak ada kendaraan yang disewa hari ini</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {rental.map((kendaraan) => (
        <Card data={kendaraan} key={kendaraan.id} isButtonShow={false} />
      ))}
    </div>
  );
}

export default KendaraanCard;
