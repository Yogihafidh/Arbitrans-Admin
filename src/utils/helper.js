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
    idKendaraan: item.kendaraan?.id,
    namaKendaraan: item.kendaraan?.nama_kendaraan,
    hargaSewa: item.kendaraan?.harga_sewa,
    tipeKendaraan: item.kendaraan?.tipe_kendaraan,
    imageKendaraan: item.kendaraan?.imageKendaraan,
    jenisKendaraan: item.kendaraan?.jenis_kendaraan,
    totalHarga: item.total_harga,
    namaPelanggan: item.nama_pelanggan,
    tanggalMulai: item.tanggal_mulai,
    tanggalAkhir: item.tanggal_akhir,
    noTelephone: item.no_telephone,
    alamat: item.alamat,
    nik: item.nik,
    status: item.status,
    lokasiPengambilan: item.lokasi_pengambilan,
    lokasiPengembalian: item.lokasi_pengembalian,
    jenisSewa: item.jenis_sewa,
    helm: item.helm,
    mantel: item.mantel,
    waktuPengambilan: item.waktu_pengambilan,
    waktuPengembalian: item.waktu_pengembalian,
    urlKtpPenyewa: item.url_ktp_penyewa,
    urlKtpPenjamin: item.url_ktp_penjamin,
    urlIdKaryawan: item.url_id_karyawan,
    urlSimA: item.url_sim_a,
    urlTiketKereta: item.url_tiket_kereta,
  }));
}
