import PelangganTable from "../features/pelanggan/PelangganTable";
import PelangganTableOperation from "../features/pelanggan/PelangganTableOperation";

function Pelanggan() {
  return (
    <div className="bg-netral-100 flex h-dvh flex-col gap-10 rounded-2xl p-8">
      <PelangganTableOperation />
      <PelangganTable />
    </div>
  );
}

export default Pelanggan;
