import { useNavigate } from "react-router";

function DashboardOpration() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/rental?status=Disewa");
  };
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="font-semibold">Kendaraan Disewa Hari ini</p>
      <p
        onClick={handleClick}
        className="hover:text-acent-blue cursor-pointer hover:underline"
      >
        Lihat Semua
      </p>
    </div>
  );
}

export default DashboardOpration;
