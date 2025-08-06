export function convertRupiah(nominal) {
  const number = String(nominal).replace(/\D/g, ""); // Hapus semua non-digit
  if (!number) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export function convertDateFormat(date) {
  return String(date).replaceAll("-", "/");
}

export function formatKendaraanData(data) {
  return data.map((item) => ({
    id: item.id,
    namaKendaraan: item.nama_kendaraan,
    statusKendaraan: item.status_kendaraan,
    hargaSewa: item.harga_sewa,
    tipeKendaraan: item.tipe_kendaraan,
    imageKendaraan: item.imageKendaraan,
    bahanBakar: item.bahan_bakar,
    deskripsi: item.deskripsi_kendaraan,
    jenisKendaraan: item.jenis_kendaraan,
    kapasitas: item.kapasitas_penumpang,
    luasBagasi: item.luas_bagasi,
    tahunProduksi: item.tahun_produksi,
    transmisi: item.transmisi,
  }));
}

export function formatRentalData(data) {
  return data.map((item) => ({
    id: item.id,
    idKendaraan: item.kendaraan.id,
    namaKendaraan: item.kendaraan.nama_kendaraan,
    statusKendaraan: item.kendaraan.status_kendaraan,
    hargaSewa: item.kendaraan.harga_sewa,
    tipeKendaraan: item.kendaraan.tipe_kendaraan,
    imageKendaraan: item.kendaraan.imageKendaraan,
    namaPelanggan: item.nama_pelanggan,
    tanggalMulai: item.tanggal_mulai,
    tanggalAkhir: item.tanggal_akhir,
    noTelephone: item.no_telephone,
    alamat: item.alamat,
    nik: item.nik,
    statusBooking: item.status_booking,
  }));
}
