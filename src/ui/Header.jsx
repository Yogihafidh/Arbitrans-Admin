import { useLocation } from "react-router";
import Logo from "./logo";
import Logout from "../features/authentication/Logout";

const headings = {
  dashboard: "Dashboard",
  rental: "Rental Kendaraan",
  pelanggan: "Pelanggan",
  jadwal: "Jadwal Sewa",
};

function Header() {
  const heading =
    headings[useLocation().pathname.split("/")[1]] || "Halaman Tidak Dikenal";

  return (
    <header className="border-netral-400 bg-netral-100 col-span-full grid grid-cols-[17rem_1fr] border-b-2">
      <div className="border-netral-400 flex items-center border-r-2 px-6 py-4">
        <Logo />
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-2xl font-semibold">{heading}</p>
        <Logout />
      </div>
    </header>
  );
}

export default Header;
