import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Basic styles for invoice PDF
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  section: { marginBottom: 8 },
  table: { display: "table", width: "auto", marginTop: 8 },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "25%", fontWeight: "bold" },
  tableCol: { width: "25%" },
  total: { marginTop: 8, textAlign: "right", fontWeight: "bold" },
  status: { marginTop: 6, color: "#03814B" },
});

function InvoicePDF({ rental }) {
  if (!rental)
    return (
      <Document>
        <Page>
          <Text>No data</Text>
        </Page>
      </Document>
    );

  const totalHarga = (() => {
    if (rental?.totalHarga !== undefined && rental?.totalHarga !== null)
      return Number(rental.totalHarga) || 0;
    try {
      const day =
        (new Date(rental.tanggalAkhir) - new Date(rental.tanggalMulai)) /
        (1000 * 60 * 60 * 24);
      return Number(rental.hargaSewa || 0) * day || 0;
    } catch (e) {
      return 0;
    }
  })();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Invoice</Text>
            <Text>{`ID: ${rental.id || "-"}`}</Text>
          </View>

          <View>
            <Text>{`Tanggal: ${new Date().toLocaleDateString()}`}</Text>
            <Text>{`Status: ${rental.status || "Belum Dibayar"}`}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold" }}>Data Pelanggan</Text>
          <Text>{rental.namaPelanggan}</Text>
          <Text>{rental.nik}</Text>
          <Text>{rental.noTelephone}</Text>
          <Text>{rental.alamat}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold" }}>Detail Sewa</Text>
          <Text>{`Kendaraan: ${rental.namaKendaraan || "-"}`}</Text>
          <Text>{`Periode: ${rental.tanggalMulai || "-"} - ${rental.tanggalAkhir || "-"}`}</Text>
          <Text>{`Harga Sewa (per hari): Rp${rental.hargaSewa || 0}`}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Keterangan</Text>
            <Text style={styles.tableColHeader}>Jumlah</Text>
            <Text style={styles.tableColHeader}>Periode</Text>
            <Text style={styles.tableColHeader}>Sub Total</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>{rental.namaKendaraan || "-"}</Text>
            <Text style={styles.tableCol}>{`Rp${rental.hargaSewa || 0}`}</Text>
            <Text
              style={styles.tableCol}
            >{`${rental.tanggalMulai || "-"} - ${rental.tanggalAkhir || "-"}`}</Text>
            <Text style={styles.tableCol}>{`Rp${totalHarga}`}</Text>
          </View>
        </View>

        <Text style={styles.total}>{`Total: Rp${totalHarga}`}</Text>

        {rental.status === "Lunas" && <Text style={styles.status}>LUNAS</Text>}
      </Page>
    </Document>
  );
}

export default InvoicePDF;
