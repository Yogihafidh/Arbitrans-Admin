import { useKendaraan } from "../../hooks/useKendaraan";
import { useRental } from "../../hooks/useRental";
import { useKendaraanTersedia } from "../kendaraan/useKendaraanTersedia";
import SummaryCaard from "./SummaryCaard";

function DashboardSumarry() {
  const { kendaraan = [] } = useKendaraan();
  const { kendaraanTersedia = [] } = useKendaraanTersedia();
  const { rental: KendaraanDisewa } = useRental(["Disewa", "Telat"]);

  return (
    <div className="flex items-center justify-between gap-4">
      <SummaryCaard
        color="blue"
        variantColor="soft"
        angka={kendaraan.length}
        keterangan="Total Kendaraan"
      />
      <SummaryCaard
        color="green"
        variantColor="soft"
        angka={kendaraanTersedia.length}
        keterangan="Kendaraan Tersedia"
      />
      <SummaryCaard
        color="red"
        variantColor="soft"
        angka={KendaraanDisewa.length}
        keterangan="Kendaraan Disewa"
      />
    </div>
  );
}

export default DashboardSumarry;
