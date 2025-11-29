import { useSearchParams } from "react-router";
import { useRental } from "../../hooks/useRental";
import { convertDateFormat, convertRupiah } from "../../utils/helper";
import Table from "../../ui/Table";

function RiwayatTable() {
  const { rental = [] } = useRental("Selesai");

  const [searchparams] = useSearchParams();
  const querySearch = searchparams.get("search") || "";

  // Searching feature
  const filteredRental = rental
    .filter((item) => {
      const nama = item?.namaPelanggan?.toLowerCase() || "";
      return nama.includes(querySearch.toLowerCase());
    })

    .sort((a, b) => {
      const dateA = new Date(a.tanggalMulai || 0);
      const dateB = new Date(b.tanggalMulai || 0);
      return dateB - dateA;
    });

  return (
    <div className="scrollbar-thin scrollbar-thumb-netral-300 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto">
      <Table columns="minmax(350px,1.5fr) minmax(250px,1.2fr) minmax(200px,1fr) minmax(180px,1fr) minmax(200px,1.2fr) minmax(180px,1fr) minmax(220px,1fr) minmax(120px,0.8fr)">
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>Nama Pelanggan</Table.Column>
          <Table.Column>NIK</Table.Column>
          <Table.Column>No Telephone</Table.Column>
          <Table.Column>Alamat</Table.Column>
          <Table.Column>Total Harga</Table.Column>
          <Table.Column>Tanggal Sewa</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>

        <Table.Body
          data={filteredRental}
          render={(rental) => (
            <Table.Row key={rental.id}>
              <Table.Column className="text-netral-900 justify-start pr-4 pl-4 text-left font-mono text-sm font-medium whitespace-nowrap">
                {rental?.id || "-"}
              </Table.Column>

              <Table.Column className="text-netral-900 justify-start pl-4 text-left font-medium">
                {rental?.namaPelanggan || "-"}
              </Table.Column>

              <Table.Column className="text-netral-800 justify-start pl-4 text-left">
                {rental?.nik || "-"}
              </Table.Column>

              <Table.Column className="text-netral-800 justify-start pl-4 text-left">
                {rental?.noTelephone || "-"}
              </Table.Column>

              <Table.Column className="text-netral-800 justify-start pl-4 text-left">
                {rental?.alamat || "-"}
              </Table.Column>

              <Table.Column className="text-netral-900 font-semibold">
                {rental?.totalHarga ? convertRupiah(rental.totalHarga) : "-"}
              </Table.Column>

              <Table.Column className="text-netral-700 justify-start pl-4 text-left whitespace-nowrap">
                {rental?.tanggalMulai
                  ? convertDateFormat(rental.tanggalMulai)
                  : "-"}
                {" - "}
                {rental?.tanggalAkhir
                  ? convertDateFormat(rental.tanggalAkhir)
                  : "-"}
              </Table.Column>

              <Table.Column>
                <div className="flex items-center justify-center">
                  <span className="border-acent-green bg-acent-green/10 text-acent-green rounded-full border-2 px-4 py-1.5 text-sm leading-tight font-semibold">
                    {rental?.status || "Selesai"}
                  </span>
                </div>
              </Table.Column>
            </Table.Row>
          )}
        />
      </Table>
    </div>
  );
}

export default RiwayatTable;
