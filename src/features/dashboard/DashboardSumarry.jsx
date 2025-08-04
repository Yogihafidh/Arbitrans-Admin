import { useKendaraan } from "../../hooks/useKendaraan";
import SummaryCaard from "./SummaryCaard";

function DashboardSumarry() {
  const { kendaraan = [] } = useKendaraan();
  const totalKendaraan = kendaraan.length;
  const kendaraanTersedia = kendaraan.filter(
    (kendaraan) => kendaraan.statusKendaraan === "Tersedia",
  ).length;
  const kendaraanDisewa = kendaraan.filter(
    (kendaraan) => kendaraan.statusKendaraan === "Disewa",
  ).length;

  return (
    <div className="flex items-center justify-between gap-4">
      <SummaryCaard
        color="blue"
        variantColor="soft"
        angka={totalKendaraan}
        keterangan="Total Kendaraan"
      />
      <SummaryCaard
        color="green"
        variantColor="soft"
        angka={kendaraanTersedia}
        keterangan="Kendaraan Tersedia"
      />
      <SummaryCaard
        color="red"
        variantColor="soft"
        angka={kendaraanDisewa}
        keterangan="Kendaraan Disewa"
      />
    </div>
  );
}

export default DashboardSumarry;
