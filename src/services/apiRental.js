import supabase from "./Supabase";

export async function getRentalKendaraan(filter) {
  let query = supabase
    .from("booking")
    .select(
      "id, nama_pelanggan, no_telephone, nik, alamat, tanggal_mulai, tanggal_akhir, status_booking, kendaraan!inner(id, nama_kendaraan, status_kendaraan, harga_sewa, tipe_kendaraan, imageKendaraan(url_gambar))",
    )
    .order("tanggal_akhir", { ascending: false });

  if (filter?.field && filter?.value) {
    if (Array.isArray(filter.value)) {
      query = query.in(filter.field, filter.value);
    } else {
      query = query.eq(filter.field, filter.value);
    }
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(
      "Data rental kendaraan tidak bisa diambil. Coba beberapa menit lagi!.",
    );
  }

  return data;
}

export async function createRental(newRental) {
  console.log(newRental);
  // Insert data tabel rental
  const { error: rentalError } = await supabase
    .from("booking")
    .insert([newRental]);

  if (rentalError) {
    console.error("Insert data rental gagal: ", rentalError);
    throw new Error("rental gagal ditambahkan, coba hubungi admin!");
  }

  // Update status kendaraan in tabel kendaraan
  const idKendaraan = Number(newRental?.id_kendaraan);
  console.log(idKendaraan);
  const { data: kendaraanResult, error: kendaraanUpdateError } = await supabase
    .from("kendaraan")
    .update({ status_kendaraan: "Pending" })
    .eq("id", idKendaraan)
    .select();

  if (!kendaraanResult || kendaraanResult.length === 0) {
    throw new Error(
      "Data kendaraan tidak ditemukan atau tidak berhasil diupdate.",
    );
  }

  if (kendaraanUpdateError) {
    console.error("Update data rental gagal: ", kendaraanUpdateError);
    throw new Error("rental gagal diupdate, coba hubungi admin!");
  }
}

export async function editRental(rental) {
  const { data: rentalResult, error: errorRental } = await supabase
    .from("booking")
    .update(rental)
    .eq("id", rental?.id)
    .select();

  if (!rentalResult || rentalResult.length === 0) {
    throw new Error(
      "Data rental tidak ditemukan atau tidak berhasil diupdate.",
    );
  }

  if (errorRental) {
    console.error("Update data rental gagal: ", errorRental);
    throw new Error("Rental gagal diupdate, coba hubungi admin!");
  }
}

export async function editStatusKendaraan(kendaraan) {
  const idKendaraan = Number(kendaraan.idKendaraan);
  const { data: kendaraanResult, error: kendaraanUpdateError } = await supabase
    .from("kendaraan")
    .update({ status_kendaraan: kendaraan.status_kendaraan })
    .eq("id", idKendaraan)
    .select();

  if (!kendaraanResult || kendaraanResult.length === 0) {
    throw new Error(
      "Data kendaraan tidak ditemukan atau tidak berhasil diupdate.",
    );
  }

  if (kendaraanUpdateError) {
    console.error("Update data rental gagal: ", kendaraanUpdateError);
    throw new Error("Rental gagal diupdate, coba hubungi admin!");
  }
}

export async function deleteRental(rental) {
  // Delele kendaraan
  const { error: bookingTabelError } = await supabase
    .from("booking")
    .delete()
    .eq("id", rental.idRental);
  if (bookingTabelError) {
    console.error("Gagal menghapus data rental: ", bookingTabelError);
    throw new Error("Gagal menghapus data rental");
  }

  // Set Status Kendaraan menjadi tersedia
  const { data: kendaraanResult, error: kendaraanUpdateError } = await supabase
    .from("kendaraan")
    .update({ status_kendaraan: "Tersedia" })
    .eq("id", rental.idKendaraan)
    .select();

  if (!kendaraanResult || kendaraanResult.length === 0) {
    throw new Error(
      "Data kendaraan tidak ditemukan atau tidak berhasil diupdate.",
    );
  }

  if (kendaraanUpdateError) {
    console.error("Update data rental gagal: ", kendaraanUpdateError);
    throw new Error("Rental gagal diupdate, coba hubungi admin!");
  }
}
