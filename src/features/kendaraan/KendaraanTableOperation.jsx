import { useSearchParams } from "react-router";
import { useMemo } from "react";

import Button from "../../ui/Button";
import ButtonDropdown from "../../ui/ButtonDropdown";
import Filter from "../../ui/Filter";
import Modal from "../../ui/Modal";
import InputSearch from "../../ui/InputSearch";
import KendaraanForm from "./KendaraanForm";

function KendaraanTableOperation() {
  // useMemo to avoid re-creating icons on every render
  const iconActive = useMemo(
    () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.64622 9.64621L7.64622 4.64622C7.69265 4.59973 7.7478 4.56285 7.8085 4.53769C7.8692 4.51252 7.93426 4.49957 7.99997 4.49957C8.06567 4.49957 8.13074 4.51252 8.19144 4.53769C8.25214 4.56285 8.30728 4.59973 8.35372 4.64622L13.3537 9.64622C13.4475 9.74004 13.5002 9.86728 13.5002 9.99997C13.5002 10.1326 13.4475 10.2599 13.3537 10.3537C13.2599 10.4475 13.1326 10.5002 13 10.5002C12.8673 10.5002 12.74 10.4475 12.6462 10.3537L7.99997 5.70684L3.35372 10.3537C3.30726 10.4002 3.25211 10.437 3.19141 10.4622C3.13072 10.4873 3.06566 10.5002 2.99997 10.5002C2.93427 10.5002 2.86921 10.4873 2.80852 10.4622C2.74782 10.437 2.69267 10.4002 2.64622 10.3537C2.59976 10.3073 2.56291 10.2521 2.53777 10.1914C2.51263 10.1307 2.49969 10.0657 2.49969 9.99997C2.49969 9.93427 2.51263 9.86921 2.53777 9.80852C2.56291 9.74782 2.59976 9.69267 2.64622 9.64621Z"
          fill="currentColor"
        />
      </svg>
    ),
    [],
  );
  const iconPasif = useMemo(
    () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3538 6.35378L8.35378 11.3538C8.30735 11.4003 8.2522 11.4372 8.1915 11.4623C8.13081 11.4875 8.06574 11.5004 8.00003 11.5004C7.93433 11.5004 7.86926 11.4875 7.80856 11.4623C7.74786 11.4372 7.69272 11.4003 7.64628 11.3538L2.64628 6.35378C2.55246 6.25996 2.49976 6.13272 2.49976 6.00003C2.49976 5.86735 2.55246 5.7401 2.64628 5.64628C2.7401 5.55246 2.86735 5.49976 3.00003 5.49976C3.13272 5.49976 3.25996 5.55246 3.35378 5.64628L8.00003 10.2932L12.6463 5.64628C12.6927 5.59983 12.7479 5.56298 12.8086 5.53784C12.8693 5.5127 12.9343 5.49976 13 5.49976C13.0657 5.49976 13.1308 5.5127 13.1915 5.53784C13.2522 5.56298 13.3073 5.59983 13.3538 5.64628C13.4002 5.69274 13.4371 5.74789 13.4622 5.80859C13.4874 5.86928 13.5003 5.93434 13.5003 6.00003C13.5003 6.06573 13.4874 6.13079 13.4622 6.19148C13.4371 6.25218 13.4002 6.30733 13.3538 6.35378Z"
          fill="currentColor"
        />
      </svg>
    ),
    [],
  );

  const statusOptions = useMemo(
    () => [
      { label: "Tersedia", value: "Tersedia" },
      { label: "Pending", value: "Pending" },
      { label: "Disewa", value: "Disewa" },
    ],
    [],
  );

  // Get the current status from URL search params
  const [searchparams] = useSearchParams();
  const status = searchparams.get("status") || "Tersedia";

  return (
    <div className="flex items-center justify-between">
      <div className="w-1/4">
        <InputSearch placeholder="Cari nama atau Tipe kendaraan..." />
      </div>

      <div className="flex items-center gap-4">
        <Modal>
          <Modal.Open opens="kendaraan-form">
            <Button
              text="Tambah Kendaraan"
              type="primary"
              leftIcon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.75 11H12.5V3.75C12.5 3.33579 12.1642 3 11.75 3C11.3358 3 11 3.33579 11 3.75V11H3.75C3.33579 11 3 11.3358 3 11.75C3 12.1642 3.33579 12.5 3.75 12.5H11V19.75C11 20.1642 11.3358 20.5 11.75 20.5C12.1642 20.5 12.5 20.1642 12.5 19.75V12.5H19.75C20.1642 12.5 20.5 12.1642 20.5 11.75C20.5 11.3358 20.1642 11 19.75 11Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </Modal.Open>
          <Modal.Window name="kendaraan-form">
            <KendaraanForm />
          </Modal.Window>
        </Modal>

        <ButtonDropdown
          text={status}
          buttonName="filter-status"
          iconActive={iconActive}
          iconPasif={iconPasif}
        >
          <Filter
            className="absolute top-14 right-0.5 z-50 bg-white"
            type="list"
            options={statusOptions}
          />
        </ButtonDropdown>
      </div>
    </div>
  );
}

export default KendaraanTableOperation;
