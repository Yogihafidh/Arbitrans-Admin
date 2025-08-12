import { useLocation } from "react-router";
import Logo from "./Logo";
import Logout from "../features/authentication/Logout";

const headings = {
  dashboard: "Dashboard",
  rental: "Rental",
  pelanggan: "Pelanggan",
  jadwal: "Jadwal Sewa",
};

function Header() {
  const heading =
    headings[useLocation().pathname.split("/")[1]] || "Halaman Tidak Dikenal";

  return (
    <header className="border-netral-400 bg-netral-100 justify-between border-b-2 md:col-span-full lg:grid lg:grid-cols-[15rem_1fr] xl:grid-cols-[17rem_1fr]">
      <div className="border-netral-400 hidden items-center px-6 py-4 md:border-r-2 lg:flex">
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
