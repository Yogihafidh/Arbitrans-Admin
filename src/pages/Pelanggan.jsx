import { Outlet } from "react-router";

function Pelanggan() {
  return (
    <div className="bg-netral-100 flex h-dvh flex-col gap-10 rounded-2xl p-4 md:p-8">
      <Outlet />
    </div>
  );
}

export default Pelanggan;
