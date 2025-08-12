import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./sidebar";

function AppLayout() {
  return (
    <div className="2xl:border-netral-400 relative m-auto block h-screen max-w-[1600px] lg:grid lg:grid-cols-[15rem_1fr] lg:grid-rows-[auto_1fr] xl:grid-cols-[17rem_1fr] 2xl:border-2">
      <Header />
      <Sidebar />
      <div className="scrollbar-thin scrollbar-thumb-netral-400 scrollbar-track-white scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl h-full overflow-y-auto">
        <div className="bg-netral-200 m-auto min-h-full p-4 lg:p-6 xl:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
