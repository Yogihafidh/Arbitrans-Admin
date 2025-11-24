import { useSearchParams } from "react-router";
import { useRental } from "../../hooks/useRental";
import Table from "../../ui/Table";
import RentalRow from "./RentalRow";

function PelangganTable() {
  // Show only these statuses in pelanggan table (Selesai will be archived/not shown)
  const { rental = [], isLoading: rentalLoading } = useRental([
    "Belum Dibayar",
    "Lunas",
    "Disewa",
  ]);

  const [searchparams] = useSearchParams();
  const querySearch = searchparams.get("search") || "";

  // Searching feature
  const filteredRental = rental.filter((item) => {
    const nama = item?.namaPelanggan?.toLowerCase() || "";
    return nama.includes(querySearch);
  });

  return (
    <div className="scrollbar-thin scrollbar-thumb-netral-300 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
      <Table columns="minmax(180px,2fr) 200px 140px minmax(180px,2fr) minmax(220px,2fr) 140px 200px 140px 160px">
        <Table.Header>
          <Table.Column className="text-left pl-4">Nama Pelanggan</Table.Column>
          <Table.Column>NIK</Table.Column>
          <Table.Column>No Telephone</Table.Column>
          <Table.Column className="text-left pl-4">Alamat</Table.Column>
          <Table.Column className="text-left pl-4">Nama Kendaraan</Table.Column>
          <Table.Column>Total Harga Sewa</Table.Column>
          <Table.Column className="text-left pl-4">Tanggal Sewa</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Aksi</Table.Column>
        </Table.Header>

        <Table.Body
          data={filteredRental}
          render={(rental) => (
            <RentalRow
              rental={rental}
              isLoading={rentalLoading}
              key={rental.id}
            />
          )}
        />
      </Table>
    </div>
  );
}

export default PelangganTable;
