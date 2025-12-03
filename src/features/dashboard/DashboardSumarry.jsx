import { useKendaraan } from "../../hooks/useKendaraan";
import { useKendaraanTersedia } from "../kendaraan/useKendaraanTersedia";
import { useKendaraanDisewaHariIni } from "./useKendaraanDisewaHariIni";
import SummaryCaard from "./SummaryCaard";

function DashboardSumarry() {
  const { kendaraan = [] } = useKendaraan();
  const { kendaraanTersedia = [] } = useKendaraanTersedia();
  const { kendaraanDisewaHariIni } = useKendaraanDisewaHariIni([
    "Disewa",
    "Lunas",
  ]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
