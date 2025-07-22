import Card from "../../ui/Card";
import { useAllRental } from "./useAllRental";

function KendaraanCard() {
  const { rental = [], error, isLoading } = useAllRental();

  return (
    <div className="grid grid-cols-4 gap-4">
      {rental.map((rentalItem) => (
        <Card booking={rentalItem} />
      ))}
    </div>
  );
}

export default KendaraanCard;
