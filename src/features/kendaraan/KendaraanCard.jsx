import { memo } from "react";
import { useSearchParams } from "react-router";
import { useRental } from "../../hooks/useRental";
import { useKendaraanTersedia } from "./useKendaraanTersedia";
import Card from "../../ui/Card";
import KendaraanCardSkeleton from "../../ui/CardSkeletonLoading";
import EmptyMessage from "../../ui/EmptyMessage";

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

  if (kendaraanLoading || rentalLoading)
    return <KendaraanCardSkeleton count={4} />;
  if (filteredRental.length === 0 && querySearch)
    return (
      <EmptyMessage
        heading="Kendaraan Tidak ditemukan"
        message="Kendaraan yang anda cari tidak ditemukan"
      />
    );
  if (filteredRental.length === 0 && status === "Tersedia")
    return (
      <EmptyMessage
        heading="Tidak ada kendaraan"
        message="Tidak ada kendaraan, silahkan tambahkan kendaraan terlebih dahulu "
      />
    );
  if (filteredRental.length === 0 && status === "Pending")
    return (
      <EmptyMessage
        heading="Tidak ada rental"
        message="Tidak ada rental untuk hari ini"
      />
    );
  if (filteredRental.length === 0 && status === "Disewa")
    return (
      <EmptyMessage
        heading="Tidak ada yang disewa"
        message="Tidak ada kendaraan yang disewa hari ini"
      />
    );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {filteredRental.map((rentalItem) => (
        <Card data={rentalItem} key={rentalItem.id} />
      ))}
    </div>
  );
}

export default memo(KendaraanCard);
