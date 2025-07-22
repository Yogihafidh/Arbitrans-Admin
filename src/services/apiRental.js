import supabase from "./Supabase";

export async function getRentalKendaraan() {
  const query = supabase
    .from("booking")
    .select(
      "nama_pelanggan, tanggal_mulai, tanggal_akhir, kendaraan(nama_kendaraan, status_kendaraan, harga_sewa, imageKendaraan(url_gambar))",
    );

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(
      "Data rental kendaraan tidak bisa diambil. Coba beberapa menit lagi!.",
    );
  }

  return data;
}
