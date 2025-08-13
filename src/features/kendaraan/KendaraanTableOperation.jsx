import { useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { useClickOutside } from "../../hooks/useClikOutside";

import Button from "../../ui/Button";
import ButtonDropdown from "../../ui/ButtonDropdown";
import Filter from "../../ui/Filter";
import Modal from "../../ui/Modal";
import InputSearch from "../../ui/InputSearch";
import KendaraanForm from "./KendaraanForm";
import ButtonIcon from "../../ui/ButtonIcon";

function KendaraanTableOperation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const [searchparams] = useSearchParams();
  const status = searchparams.get("status") || "Tersedia";

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  useClickOutside(
    containerRef,
    () => setIsMobileMenuOpen(false),
    [buttonRef, formRef],
    isMobileMenuOpen,
  );

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex flex-shrink items-center justify-between sm:flex-shrink-0">
        <div className="min-w-0 flex-grow sm:min-w-fit sm:flex-grow-0">
          <InputSearch placeholder="Cari nama atau Tipe kendaraan..." />
        </div>

        <div className="md:hidden">
          <ButtonIcon
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.96134 2.00065H19.1413V2.01065C20.3363 1.98986 21.4217 2.70428 21.875 3.81009C22.3284 4.9159 22.057 6.1866 21.1913 7.01065L16.4213 11.7807C15.8904 12.3125 15.5858 13.0292 15.5713 13.7807V18.1807C15.5698 19.0931 15.1403 19.9519 14.4113 20.5007L13.1713 21.4307C12.2944 22.0979 11.1144 22.2085 10.1288 21.7157C9.14325 21.2229 8.52367 20.2125 8.53134 19.1107V13.7807C8.51691 13.0292 8.21231 12.3125 7.68134 11.7807L2.91134 7.01065C2.0381 6.18783 1.76172 4.91222 2.2161 3.80176C2.67049 2.6913 3.76178 1.97531 4.96134 2.00065ZM20.4413 4.37065C20.2255 3.84303 19.7114 3.49894 19.1413 3.50065H4.96134C4.3913 3.49894 3.87714 3.84303 3.66134 4.37065C3.43857 4.89571 3.56176 5.50372 3.97134 5.90065L8.76134 10.6707C9.59042 11.4928 10.0551 12.6131 10.0513 13.7807V19.1107C10.046 19.4793 10.1873 19.835 10.4443 20.0994C10.7012 20.3639 11.0527 20.5154 11.4213 20.5207C11.7226 20.5193 12.0148 20.4172 12.2513 20.2307L13.4913 19.3007C13.8439 19.0363 14.0513 18.6213 14.0513 18.1807V13.7807C14.0529 12.6102 14.5249 11.4895 15.3613 10.6707L20.1313 5.90065C20.5409 5.50372 20.6641 4.89571 20.4413 4.37065Z"
                  fill="#212529"
                />
              </svg>
            }
            text="Menu"
            type="primary"
            ref={buttonRef}
            onEvent={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2"
          />
        </div>

        <div className="hidden w-full items-center justify-end gap-4 md:flex">
          <Modal>
            <Modal.Open opens="kendaraan-form">
              <Button text="Tambah Kendaraan" type="primary" />
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

      {isMobileMenuOpen && (
        <div
          ref={containerRef}
          className="absolute top-10 right-0 z-30 flex w-fit flex-col gap-4 rounded-md border-white bg-white/20 p-4 shadow-md backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col items-center justify-between gap-2">
            <Modal>
              <Modal.Open opens="kendaraan-form">
                <Button text="Tambah Kendaraan" type="primary" />
              </Modal.Open>
              <Modal.Window name="kendaraan-form">
                <KendaraanForm ref={formRef} />
              </Modal.Window>
            </Modal>

            <ButtonDropdown
              text={status}
              iconActive={iconActive}
              iconPasif={iconPasif}
              className="w-full sm:w-fit"
            >
              <Filter
                className="absolute top-14 right-0.5 z-50 bg-white"
                type="list"
                options={statusOptions}
              />
            </ButtonDropdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default KendaraanTableOperation;
