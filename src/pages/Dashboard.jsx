import { useNavigate } from "react-router";
import DashboardSumarry from "../features/dashboard/DashboardSumarry";
import KendaraanCard from "../features/dashboard/KendaraanCard";

function Dashboard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/rental?status=Disewa");
  };

  return (
    <div className="flex flex-col gap-10">
      <DashboardSumarry />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p>Kendaraan Disewa</p>
          <p
            onClick={handleClick}
            className="hover:text-acent-blue cursor-pointer hover:underline"
          >
            Lihat Semua
          </p>
        </div>
        <KendaraanCard />
      </div>
    </div>
  );
}

export default Dashboard;
