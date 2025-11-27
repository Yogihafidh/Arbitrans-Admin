import { useSearchParams } from "react-router";
import { useRental } from "../../hooks/useRental";
import Table from "../../ui/Table";
import RentalRow from "./RentalRow";

function PelangganTable() {
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
      <Table columns="minmax(320px,1.2fr) minmax(220px,1.4fr) minmax(220px,1.4fr) minmax(150px,1.4fr) minmax(220px,1.4fr) minmax(180px,1.4fr) minmax(170px,1.5fr)">
        <Table.Header>
          <Table.Column className="pl-4 text-left">ID</Table.Column>
          <Table.Column className="pl-4 text-left">Nama Pelanggan</Table.Column>
          <Table.Column className="pl-4 text-left">Nama Kendaraan</Table.Column>
          <Table.Column>Total Harga</Table.Column>
          <Table.Column className="pl-4 text-left">Tanggal Sewa</Table.Column>
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
