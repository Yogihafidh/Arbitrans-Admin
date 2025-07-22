import KendaraanCard from "../features/kendaraan/KendaraanCard";
import KendaraanTableOperation from "../features/kendaraan/KendaraanTableOperation";

function RentalKendaraan() {
  return (
    <div className="flex flex-col gap-10">
      <KendaraanTableOperation />
      <KendaraanCard />
    </div>
  );
}

export default RentalKendaraan;
