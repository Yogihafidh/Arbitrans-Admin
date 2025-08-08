import { useKendaraan } from "../../hooks/useKendaraan";
import { useKendaraanTersedia } from "../kendaraan/useKendaraanTersedia";
import SummaryCaard from "./SummaryCaard";
import { useKendaraanDisewaHariIni } from "./useKendaraanDisewaHariIni";

function DashboardSumarry() {
  const { kendaraan = [] } = useKendaraan();
  const { kendaraanTersedia = [] } = useKendaraanTersedia();
  const { kendaraanDisewaHariIni } = useKendaraanDisewaHariIni([
    "Disewa",
    "Telat",
  ]);

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
        angka={kendaraanDisewaHariIni.length}
        keterangan="Kendaraan Disewa"
      />
    </div>
  );
}

export default DashboardSumarry;
