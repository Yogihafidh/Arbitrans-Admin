import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  // Company Header
  headerSection: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  companyInfo: {
    fontSize: 9,
    marginBottom: 1,
  },
  // Invoice Title & Details
  invoiceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 8,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  invoiceDetails: {
    fontSize: 9,
    textAlign: "right",
  },
  // Customer & Rental Info
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  infoPart: {
    flex: 1,
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 3,
  },
  infoText: {
    fontSize: 9,
    marginBottom: 1,
  },
  // Table Styles
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 6,
    fontWeight: "bold",
    fontSize: 9,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 6,
    fontSize: 9,
  },
  tableCol1: { flex: 2.5, paddingRight: 4 },
  tableCol2: { flex: 1.2, textAlign: "right", paddingRight: 4 },
  tableCol3: { flex: 1.3, textAlign: "center", paddingRight: 4 },
  tableCol4: { flex: 1, textAlign: "right" },
  // Total & Status
  totalSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 8,
    paddingVertical: 6,
    borderTopWidth: 2,
    borderTopColor: "#000",
  },
  totalLabel: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 11,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 11,
  },
  // Footer - Bank Info & Signature
  footer: {
    marginVertical: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  footerBox: {
    flex: 1,
    fontSize: 8,
    marginRight: 8,
    paddingTop: 4,
  },
  bankTitle: {
    fontWeight: "bold",
    fontSize: 9,
    marginBottom: 2,
  },
  bankText: {
    fontSize: 8,
    marginBottom: 1,
  },
});

function InvoicePDF({ rental }) {
  if (!rental)
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No data available</Text>
        </Page>
      </Document>
    );

  const totalHarga = (() => {
    try {
      const start = new Date(rental.tanggalMulai);
      const end = new Date(rental.tanggalAkhir);
      const day = (end - start) / (1000 * 60 * 60 * 24);
      return Math.max(day, 1) * Number(rental.hargaSewa || 0);
    } catch (e) {
      return 0;
    }
  })();

  const formatCurrency = (num) => {
    return `Rp${Number(num).toLocaleString("id-ID")}`;
  };

  const invoiceDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Header */}
        <View style={styles.headerSection}>
          <Text style={styles.companyName}>ARBITRANS</Text>
          <Text style={styles.companyInfo}>Your Transportation Solution</Text>
          <Text style={styles.companyInfo}>
            Jalan Kober GG Andel,Radial No 51 Purwokerto,Jawa Tengah
          </Text>
          <Text style={styles.companyInfo}>
            Telp/WA 08154295220 / 08112532222
          </Text>
        </View>

        {/* Invoice Title & Details */}
        <View style={styles.invoiceSection}>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.companyInfo}>{`Invoice No: ${rental.id || "-"}`}</Text>
          </View>
          <View style={styles.invoiceDetails}>
            <Text>{`Rabu, ${invoiceDate}`}</Text>
            <Text style={{ marginTop: 2 }}>
              Status: {rental.status || "Belum Dibayar"}
            </Text>
          </View>
        </View>

        {/* Customer & Rental Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoPart}>
            <Text style={styles.infoLabel}>ID Pelanggan MBS</Text>
            <Text style={styles.infoText}>Nama: {rental.namaPelanggan}</Text>
            <Text style={styles.infoText}>Telp: {rental.noTelephone}</Text>
            <Text style={styles.infoText}>Alamat: {rental.alamat}</Text>
          </View>
          <View style={{ ...styles.infoPart, marginLeft: 20 }}>
            <Text style={styles.infoLabel}>Detail Sewa</Text>
            <Text style={styles.infoText}>NIK: {rental.nik}</Text>
          </View>
        </View>

        {/* Rental Period */}
        <Text style={{ fontSize: 9, marginBottom: 8, fontWeight: "bold" }}>
          {`Customer ${rental.namaPelanggan} Date Rent ${rental.tanggalMulai} 11:00 to ${rental.tanggalAkhir} 21:00 Paket Sewa ${rental.namaKendaraan}`}
        </Text>

        {/* Detail Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol1}>Keterangan</Text>
            <Text style={styles.tableCol2}>Jumlah</Text>
            <Text style={styles.tableCol3}>Periode</Text>
            <Text style={styles.tableCol4}>Sub Total</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol1}>
              {rental.namaKendaraan || "-"}
            </Text>
            <Text style={styles.tableCol2}>{formatCurrency(rental.hargaSewa)}</Text>
            <Text style={styles.tableCol3}>
              {rental.tanggalMulai} - {rental.tanggalAkhir}
            </Text>
            <Text style={styles.tableCol4}>{formatCurrency(totalHarga)}</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalHarga)}</Text>
        </View>

        {/* Status Badge */}
        {rental.status === "Lunas" && (
          <View style={{ marginVertical: 4, textAlign: "center" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#03814B",
              }}
            >
              LUNAS
            </Text>
          </View>
        )}

        {/* Footer - Bank & Payment Info */}
        <View style={styles.footer}>
          <View style={{ textAlign: "center" }}>
            <Text style={styles.bankTitle}>Rekening Pembayaran</Text>
            <Text style={styles.bankText}>
              Bank BCA 046-09-66647 a/n Arbiyanto Bayu Adi
            </Text>
            <Text style={styles.bankText}>
              Bank BRI 3237-0101-6484-535 a/n Arbiyanto Bayu Adi
            </Text>
            <Text style={styles.bankText}>
              Bank Mandiri Cv Arbitrans 180000-433-9075
            </Text>
          </View>

          <View style={styles.footerSection}>
            <Text style={{ ...styles.footerBox, fontWeight: "bold" }}>
              Bp Aris
            </Text>
            <Text style={{ ...styles.footerBox, textAlign: "center", fontWeight: "bold" }}>
              Terima Kasih Atas Kepercayaannya
            </Text>
            <Text style={{ ...styles.footerBox, textAlign: "right", fontWeight: "bold" }}>
              Eko Priyadi
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;
