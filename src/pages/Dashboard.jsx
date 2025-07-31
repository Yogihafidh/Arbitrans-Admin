import DashboardSumarry from "../features/dashboard/DashboardSumarry";
import KendaraanCard from "../features/dashboard/KendaraanCard";

function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <DashboardSumarry />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p>Kendaraan Disewa</p>
          <p className="hover:text-acent-blue cursor-pointer hover:underline">
            Lihat Semua
          </p>
        </div>
        <KendaraanCard />
      </div>
    </div>
  );
}

export default Dashboard;
