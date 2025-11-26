import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { convertDateFormat, convertRupiah } from "../../utils/helper";
import { useDeleteRental } from "./useDeleteRental";
import { useEditStatus } from "./useEditStatus";
import Message from "../../ui/Message";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import PelangganForm from "./PelangganForm";
import InvoicePDF from "./InvoicePDF";
import { pdf } from "@react-pdf/renderer";

const STATUS_STYLES = {
  Disewa: "bg-acent-blue/10 border-acent-blue text-acent-blue",
  Telat: "bg-acent-red/10 border-acent-red text-acent-red",
  Selesai: "bg-acent-green/10 border-acent-green text-acent-green",
  "Belum Dibayar": "bg-acent-orange/10 border-acent-yellow text-acent-yellow",
  Lunas: "bg-acent-green/10 border-acent-green text-acent-green",
  default: "bg-netral-200 border-netral-400 text-netral-700",
};

const ACTION_BUTTON_BASE =
  "flex h-10 w-10 items-center justify-center rounded-xl border transition focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const ACTION_VARIANTS = {
  edit: `${ACTION_BUTTON_BASE} border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/40`,
  delete: `${ACTION_BUTTON_BASE} border-acent-red/30 bg-acent-red/10 text-acent-red hover:bg-acent-red/20 focus-visible:ring-acent-red/40`,
  print: `${ACTION_BUTTON_BASE} border-acent-green/30 bg-[rgba(3,129,75,0.12)] text-acent-green hover:bg-[rgba(3,129,75,0.18)] focus-visible:ring-acent-green/40`,
};

function RentalRow({ rental, isRentalTable = true }) {
  const { isDelete: isDeleteRental, deleteRental } = useDeleteRental();
  const { isEdit, editStatusRental } = useEditStatus();

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      const blob = await pdf(<InvoicePDF rental={rental} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Generate PDF error:", err);
    } finally {
      setIsPrinting(false);
    }
  };

  // Use backend total_harga when available, fall back to old manual calculation for legacy rows
  const manualTotal = (() => {
    if (!rental?.tanggalAkhir || !rental?.tanggalMulai || !rental?.hargaSewa)
      return 0;
    const hari = differenceInCalendarDays(
      new Date(rental.tanggalAkhir),
      new Date(rental.tanggalMulai),
    );
    return Math.max(hari, 0) * Number(rental?.hargaSewa || 0);
  })();

  const totalHargaSewa = rental?.totalHarga ?? manualTotal;
  const formattedTotal =
    totalHargaSewa || totalHargaSewa === 0
      ? convertRupiah(totalHargaSewa)
      : "-";

  const displayedId = rental?.id || "-";

  const tanggalMulai = rental?.tanggalMulai
    ? convertDateFormat(rental.tanggalMulai)
    : "-";
  const tanggalAkhir = rental?.tanggalAkhir
    ? convertDateFormat(rental.tanggalAkhir)
    : "-";

  const currentStatus = rental?.status || "Belum Dibayar";

  return (
    <Table.Row>
      <Table.Column
        className="text-netral-900 justify-start pr-4 pl-4 text-left font-mono text-sm font-medium whitespace-nowrap"
        title={rental?.id || "ID tidak tersedia"}
      >
        {displayedId}
      </Table.Column>

      <Table.Column className="text-netral-900 justify-start pl-4 text-left font-medium">
        {rental?.namaPelanggan || "-"}
      </Table.Column>

      <Table.Column className="text-netral-800 justify-start pl-4 text-left">
        {rental?.namaKendaraan || "-"}
      </Table.Column>

      <Table.Column className="text-netral-900 font-semibold">
        {formattedTotal}
      </Table.Column>

      <Table.Column className="text-netral-700 justify-start pl-4 text-left whitespace-nowrap">
        {tanggalMulai} - {tanggalAkhir}
      </Table.Column>

      <Table.Column>
        <div className="relative mx-auto flex w-full max-w-[180px] items-center justify-center">
          <select
            value={currentStatus}
            onChange={(e) =>
              editStatusRental({ id: rental.id, status: e.target.value })
            }
            disabled={isEdit}
            className={`w-full appearance-none rounded-full border-2 px-4 py-1.5 pr-10 text-sm leading-tight font-semibold transition outline-none focus:ring-2 focus:ring-offset-1 ${
              STATUS_STYLES[currentStatus] || STATUS_STYLES.default
            } ${isEdit ? "opacity-70" : ""}`}
          >
            <option value="Belum Dibayar">Belum Dibayar</option>
            <option value="Lunas">Lunas</option>
            <option value="Disewa">Disewa</option>
            <option value="Selesai">Selesai</option>
          </select>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-current"
          >
            <path
              d="M2.25 4.5L6 8.25L9.75 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Table.Column>

      {isRentalTable && (
        <Table.Column className="justify-center px-4">
          <Modal>
            <div className="flex items-center gap-2">
              <Modal.Open opens="edit-rental">
                <button
                  type="button"
                  title="Edit data pelanggan"
                  className={ACTION_VARIANTS.edit}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 3.75L16.25 6.25M2.5 17.5L4.9375 17.1856C5.22041 17.1499 5.36186 17.132 5.49586 17.0918C5.61462 17.0563 5.72844 17.0042 5.83374 16.9371C5.95126 16.8611 6.05138 16.761 6.25161 16.5607L16.5 6.31227C17.1904 5.62189 17.1904 4.50501 16.5 3.81463C15.8096 3.12425 14.6927 3.12425 14.0023 3.81463L3.75386 14.0631C3.55363 14.2633 3.45351 14.3635 3.37748 14.481C3.3104 14.5863 3.25831 14.7001 3.22281 14.8189C3.18259 14.9529 3.16473 15.0943 3.12901 15.3772L2.5 17.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Modal.Open>

              <Modal.Open opens="delete-rental">
                <button
                  type="button"
                  title="Hapus data pelanggan"
                  className={ACTION_VARIANTS.delete}
                >
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.25 3.5H13.5V2.75C13.5 2.15326 13.2629 1.58097 12.841 1.15901C12.419 0.737053 11.8467 0.5 11.25 0.5H6.75C6.15326 0.5 5.58097 0.737053 5.15901 1.15901C4.73705 1.58097 4.5 2.15326 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM6 2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5H6V2.75ZM15 18.5H3V5H15V18.5ZM7.5 8.75V14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75ZM12 8.75V14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </Modal.Open>

              <button
                onClick={handlePrint}
                title="Cetak Invoice"
                disabled={isPrinting}
                className={`${ACTION_VARIANTS.print} ${
                  isPrinting ? "cursor-wait" : ""
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.47417 8.58159H5.48772C5.29702 8.58163 5.11433 8.50402 4.98082 8.36626C4.84732 8.2285 4.77424 8.04218 4.77805 7.84929V6.85135C4.77805 6.45484 5.09578 6.13341 5.48772 6.13341H6.47417C6.86611 6.13341 7.18384 6.45484 7.18384 6.85135V7.86365C7.18384 8.26016 6.86611 8.58159 6.47417 8.58159ZM6.13352 7.19596H5.82836V7.50468H6.13352V7.19596Z"
                    fill="#03814B"
                  />
                  <path
                    d="M5.25353 10.398H8.39738C8.69133 10.398 8.92963 10.1569 8.92963 9.85953C8.92963 9.56215 8.69133 9.32107 8.39738 9.32107H5.25353C4.95957 9.32107 4.72128 9.56215 4.72128 9.85953C4.72128 10.1569 4.95957 10.398 5.25353 10.398Z"
                    fill="#03814B"
                  />
                  <path
                    d="M9.41931 11.1375H5.25353C4.95957 11.1375 4.72128 11.3785 4.72128 11.6759C4.72128 11.9733 4.95957 12.2144 5.25353 12.2144H9.41931C9.71326 12.2144 9.95156 11.9733 9.95156 11.6759C9.95156 11.3785 9.71326 11.1375 9.41931 11.1375Z"
                    fill="#03814B"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3438 6.16212L8.37609 1.13652C8.27153 1.04587 8.13764 0.99731 7.99996 1.00012H5.87094C4.00922 1.00012 2.5 2.52693 2.5 4.41034V11.5898C2.5 13.4732 4.00922 15 5.87094 15H10.129C11.9907 15 13.4999 13.4732 13.4999 11.5898V6.56417C13.5023 6.41457 13.4462 6.27006 13.3438 6.16212ZM8.53222 2.82369L11.6974 6.02571H9.41931C8.92938 6.02571 8.53222 5.62392 8.53222 5.12829V2.82369ZM3.56451 11.5898C3.56841 12.8768 4.59875 13.9191 5.87094 13.9231H10.129C11.4012 13.9191 12.4315 12.8768 12.4354 11.5898V7.10263H9.41931C8.34147 7.10263 7.46771 6.21869 7.46771 5.12829V2.07703H5.87094C4.59875 2.08097 3.56841 3.12333 3.56451 4.41034V11.5898Z"
                    fill="#03814B"
                  />
                </svg>
              </button>
            </div>

            <Modal.Window name="edit-rental">
              <PelangganForm dataEdit={rental} />
            </Modal.Window>

            <Modal.Window name="delete-rental">
              <Message
                disabled={isDeleteRental}
                id={rental.id}
                onDelete={deleteRental}
                heading={"Hapus Pelanggan?"}
                message={
                  "Anda yakin untuk membatalkan penyewaan dan menghapus data pelanggan?"
                }
              />
            </Modal.Window>
          </Modal>
        </Table.Column>
      )}
    </Table.Row>
  );
}

export default RentalRow;
