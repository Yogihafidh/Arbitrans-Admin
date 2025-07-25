import Card from "../../ui/Card";
import { useAllRental } from "./useAllRental";

function KendaraanCard() {
  const { rental = []} = useAllRental();
  console.log(rental);

  return (
    <div className="grid grid-cols-4 gap-4">
      {rental.map((rentalItem) => (
        <Card booking={rentalItem} key={rentalItem.id} />
      ))}
    </div>
  );
}

export default KendaraanCard;
