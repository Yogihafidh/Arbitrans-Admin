import { memo } from "react";
import { useSearchParams } from "react-router";

import { useRental } from "../../hooks/useRental";

import Card from "../../ui/Card";
import { useKendaraanTersedia } from "./useKendaraanTersedia";

function KendaraanCard() {
  // get parameter URL
  const [searchparams] = useSearchParams();
  const querySearch = searchparams.get("search") || "";
  const status = searchparams.get("status") || "Tersedia";
  const statusFilter = status === "Disewa" ? ["Disewa", "Telat"] : status;

  // Get Data
  const { rental = [], isLoading: rentalLoading } = useRental(statusFilter);
  const { kendaraanTersedia = [], isLoading: kendaraanLoading } =
    useKendaraanTersedia();
  const data = status === "Tersedia" ? kendaraanTersedia : rental;

  // Searching feature
  const filteredRental = querySearch
    ? data.filter((item) => {
        const nama = item?.namaKendaraan?.toLowerCase() || "";
        const tipe = item?.tipeKendaraan?.toLowerCase() || "";

        return nama.includes(querySearch) || tipe.includes(querySearch);
      })
    : data;

  // TODO: Loading
  if (kendaraanLoading || rentalLoading) return <p>Loading</p>;
  if (filteredRental.length === 0 && querySearch)
    return <p>Kendaraan yang anda cari tidak ditemukan</p>;
  if (filteredRental.length === 0 && status === "Tersedia")
    return (
      <p>Tidak ada kendaraan, silahkan tambahkan kendaraan terlebih dahulu</p>
    );
  if (filteredRental.length === 0 && status === "Pending")
    return <p>Tidak ada rental hari ini</p>;
  if (filteredRental.length === 0 && status === "Disewa")
    return <p>Tidak ada kendaraan yang disewa hari ini</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredRental.map((rentalItem) => (
        <Card data={rentalItem} key={rentalItem.id} />
      ))}
    </div>
  );
}

export default memo(KendaraanCard);
