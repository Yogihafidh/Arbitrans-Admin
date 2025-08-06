import { useNavigate } from "react-router";
import RiwayatTable from "../features/pelanggan/RiwayatTable";
import ButtonIcon from "../ui/ButtonIcon";

function Riwayat() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-4">
        <ButtonIcon
          onEvent={() => navigate(-1)}
          className="bg-netral-100 border-netral-400 text-natural-900 hover:bg-netral-200 h-fit w-fit rounded-xl border-2 p-2"
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.64622 13.354L4.64622 8.35403C4.59973 8.30759 4.56285 8.25245 4.53769 8.19175C4.51252 8.13105 4.49957 8.06599 4.49957 8.00028C4.49957 7.93457 4.51252 7.86951 4.53769 7.80881C4.56285 7.74811 4.59973 7.69296 4.64622 7.64653L9.64622 2.64653C9.74004 2.55271 9.86728 2.5 9.99997 2.5C10.1326 2.5 10.2599 2.55271 10.3537 2.64653C10.4475 2.74035 10.5002 2.8676 10.5002 3.00028C10.5002 3.13296 10.4475 3.26021 10.3537 3.35403L5.70684 8.00028L10.3537 12.6465C10.4002 12.693 10.437 12.7481 10.4622 12.8088C10.4873 12.8695 10.5002 12.9346 10.5002 13.0003C10.5002 13.066 10.4873 13.131 10.4622 13.1917C10.437 13.2524 10.4002 13.3076 10.3537 13.354C10.3073 13.4005 10.2521 13.4373 10.1914 13.4625C10.1307 13.4876 10.0657 13.5006 9.99997 13.5006C9.93427 13.5006 9.86921 13.4876 9.80852 13.4625C9.74782 13.4373 9.69267 13.4005 9.64622 13.354Z"
                fill="currentColor"
              />
            </svg>
          }
        />
        <h1 className="text-lg font-semibold">Riwayat Penyewaan</h1>
      </div>
      <RiwayatTable />
    </>
  );
}

export default Riwayat;
