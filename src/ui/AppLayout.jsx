import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./sidebar";

function AppLayout() {
  return (
    <div className="bg-netral-200 grid h-screen grid-cols-[17rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <div className="scrollbar-thin scrollbar-thumb-netral-400 scrollbar-track-white scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl h-full overflow-y-auto pb-10">
        <div className="m-auto flex flex-col gap-1 px-8 pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
