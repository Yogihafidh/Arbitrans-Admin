import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[17rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <div className="h-full overflow-y-auto pb-10">
        <div className="m-auto flex flex-col gap-1 px-8 pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
