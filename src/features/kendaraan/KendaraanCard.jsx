import { useSearchParams } from "react-router";
import { useRental } from "./useRental";
import { useKendaraan } from "./useKendaraan";

import Card from "../../ui/Card";

function KendaraanCard() {
  // get parameter URL
  const [searchparams] = useSearchParams();
  const querySearch = searchparams.get("search") || "";
  const status = searchparams.get("status") || "Tersedia";

  // Get Data
  const { rental = [] } = useRental();
  const { kendaraan = [] } = useKendaraan();
  const data = status === "Tersedia" ? kendaraan : rental;

  // Filter Data
  const filteredRental = querySearch
    ? data.filter((item) => {
        const nama = item?.namaKendaraan?.toLowerCase() || "";
        const tipe = item?.tipeKendaraan?.toLowerCase() || "";

        return nama.includes(querySearch) || tipe.includes(querySearch);
      })
    : data;

  console.log(filteredRental);

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredRental.map((rentalItem) => (
        <Card data={rentalItem} key={rentalItem.id} />
      ))}
    </div>
  );
}

export default KendaraanCard;
