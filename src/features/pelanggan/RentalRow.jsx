import { differenceInCalendarDays } from "date-fns";
import { convertDateFormat, convertRupiah } from "../../utils/helper";
import { useDeleteRental } from "./useDeleteRental";
import Button from "../../ui/Button";
import Message from "../../ui/Message";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import PelangganForm from "./PelangganForm";

const status = {
  Disewa: "bg-acent-green/10 border-acent-green text-acent-green",
  Telat: "bg-acent-red/10 border-acent-red text-acent-red",
  Selesai: "bg-acent-blue/10 border-acent-blue text-acent-blue",
  Pending: "bg-acent-orange/10 border-acent-yellow text-acent-yellow",
};

function RentalRow({ rental, isRentalTable = true }) {
  const { isDelete: isDeleteRental, deleteRental } = useDeleteRental();
  const totalHargaSewa =
    differenceInCalendarDays(rental.tanggalAkhir, rental.tanggalMulai) *
    Number(rental?.hargaSewa);

  return (
    <Table.Row>
      <Table.Column>{rental.namaPelanggan}</Table.Column>
      <Table.Column>{rental.nik}</Table.Column>
      <Table.Column>{rental.noTelephone}</Table.Column>
      <Table.Column>{rental.alamat}</Table.Column>
      <Table.Column>{rental.namaKendaraan}</Table.Column>
      <Table.Column>{convertRupiah(totalHargaSewa)}</Table.Column>
      <Table.Column>
        <p>{convertDateFormat(rental.tanggalMulai)} - </p>
        <p>{convertDateFormat(rental.tanggalAkhir)}</p>
      </Table.Column>
      <Table.Column>
        <span
          className={`w-3/4 rounded-full border-2 px-2 py-0.5 text-center text-sm ${status[rental.status]}`}
        >
          {rental.status === "Disewa" ? "Aktif" : rental.status}
        </span>
      </Table.Column>

      {isRentalTable && (
        <Table.Column>
          <Modal>
            <div className="flex items-center justify-between gap-2">
              <Modal.Open opens="edit-rental">
                <Button
                  type="secondary"
                  leftIcon={
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.7069 4.5861L11.9144 1.79297C11.8215 1.70009 11.7113 1.62641 11.5899 1.57614C11.4686 1.52587 11.3385 1.5 11.2072 1.5C11.0759 1.5 10.9458 1.52587 10.8245 1.57614C10.7031 1.62641 10.5929 1.70009 10.5 1.79297L2.79313 9.50047C2.69987 9.593 2.62593 9.70313 2.5756 9.82448C2.52528 9.94584 2.49959 10.076 2.50001 10.2073V13.0005C2.50001 13.2657 2.60536 13.52 2.7929 13.7076C2.98043 13.8951 3.23479 14.0005 3.50001 14.0005H6.29313C6.4245 14.0009 6.55464 13.9752 6.67599 13.9249C6.79735 13.8746 6.90748 13.8006 7.00001 13.7073L14.7069 6.00047C14.7998 5.90761 14.8734 5.79736 14.9237 5.67602C14.974 5.55468 14.9999 5.42463 14.9999 5.29329C14.9999 5.16195 14.974 5.03189 14.9237 4.91055C14.8734 4.78921 14.7998 4.67896 14.7069 4.5861ZM6.29313 13.0005H3.50001V10.2073L9.00001 4.70735L11.7931 7.50047L6.29313 13.0005ZM12.5 6.79297L9.70688 4.00047L11.2069 2.50047L14 5.29297L12.5 6.79297Z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                  className="bg-primary/10 text-primary h-10 w-10 rounded-lg border-none"
                />
              </Modal.Open>

              <Modal.Open opens="delete-rental">
                <Button
                  type="logout"
                  leftIcon={
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
                  }
                  className="bg-acent-red/10 block h-10 w-10 rounded-lg border-none"
                />
              </Modal.Open>
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
