import supabase from "./Supabase";

export async function getRentalKendaraan(filter) {
  const query = supabase
    .from("booking")
    .select(
      "id, nama_pelanggan, tanggal_mulai, tanggal_akhir, kendaraan!inner(id, nama_kendaraan, status_kendaraan, harga_sewa, tipe_kendaraan, imageKendaraan(url_gambar))",
    );

  if (filter) query.eq(filter.field, filter.value);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(
      "Data rental kendaraan tidak bisa diambil. Coba beberapa menit lagi!.",
    );
  }

  return data;
}
