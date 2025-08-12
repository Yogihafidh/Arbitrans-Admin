import DashboardOpration from "../features/dashboard/DashboardOpration";
import DashboardSumarry from "../features/dashboard/DashboardSumarry";
import KendaraanCard from "../features/dashboard/KendaraanCard";

function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <DashboardSumarry />
      <div className="h-fit rounded-2xl bg-white p-4 md:p-6">
        <DashboardOpration />
        <KendaraanCard />
      </div>
    </div>
  );
}

export default Dashboard;
