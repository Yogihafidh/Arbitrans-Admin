import { useSearchParams } from "react-router";
import Card from "../../ui/Card";
import { useAllRental } from "./useAllRental";

function KendaraanCard() {
  const [searchparams] = useSearchParams();
  const querySearch = searchparams.get("search") || "";

  const { rental = [] } = useAllRental();
  const filteredRental = querySearch
    ? rental.filter((booking) => {
        const nama = booking?.kendaraan?.nama_kendaraan?.toLowerCase()|| "";
        const tipe = booking?.kendaraan?.tipe_kendaraan?.toLowerCase() || "";

        return nama.includes(querySearch) || tipe.includes(querySearch);
      })
    : rental;

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredRental.map((rentalItem) => (
        <Card booking={rentalItem} key={rentalItem.id} />
      ))}
    </div>
  );
}

export default KendaraanCard;
