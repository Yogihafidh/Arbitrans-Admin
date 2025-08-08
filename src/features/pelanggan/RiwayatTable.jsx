import { useSearchParams } from "react-router";
import { useRental } from "../../hooks/useRental";
import Table from "../../ui/Table";
import RentalRow from "./RentalRow";

function RiwayatTable() {
  // TODO: status_kendaraan = Tersedia
  const { rental = [], isLoading: rentalLoading } = useRental("Selesai");

  const [searchparams] = useSearchParams();
  const querySearch = searchparams.get("search") || "";

  // Searching feature
  const filteredRental = rental.filter((item) => {
    const nama = item?.namaPelanggan?.toLowerCase() || "";
    return nama.includes(querySearch);
  });

  return (
    <div className="scrollbar-thin scrollbar-thumb-netral-300 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
      <Table columns="1fr 1fr 1fr 1.5fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <Table.Column>Nama Pelanggan</Table.Column>
          <Table.Column>NIK</Table.Column>
          <Table.Column>No Telephone</Table.Column>
          <Table.Column>Alamat</Table.Column>
          <Table.Column>Nama Kendaraan</Table.Column>
          <Table.Column>Total Harga Sewa</Table.Column>
          <Table.Column>Tanggal Sewa</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>

        <Table.Body
          data={filteredRental}
          render={(rental) => (
            <RentalRow
              rental={rental}
              isLoading={rentalLoading}
              isRentalTable={false}
              key={rental.id}
            />
          )}
        />
      </Table>
    </div>
  );
}

export default RiwayatTable;
