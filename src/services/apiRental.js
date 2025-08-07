import supabase from "./Supabase";

export async function getRentalKendaraan(filter) {
  let query = supabase
    .from("booking")
    .select(
      "id, nama_pelanggan, no_telephone, nik, alamat, tanggal_mulai, tanggal_akhir, status, kendaraan(id, nama_kendaraan,  harga_sewa, tipe_kendaraan, imageKendaraan(url_gambar))",
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
  // Insert data tabel rental
  const { error: rentalError } = await supabase
    .from("booking")
    .insert([newRental]);

  if (rentalError) {
    console.error("Insert data rental gagal: ", rentalError);
    throw new Error("rental gagal ditambahkan, coba hubungi admin!");
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

export async function editStatusRental(rental) {
  const { data, error } = await supabase
    .from("booking")
    .update({ status: rental.status })
    .eq("id", rental.id)
    .select();

  if (!data || data.length === 0) {
    throw new Error(
      "Data rental tidak ditemukan atau tidak berhasil diupdate.",
    );
  }

  if (error) {
    console.error("Update data rental gagal: ", error);
    throw new Error("Rental gagal diupdate, coba hubungi admin!");
  }
}

export async function deleteRental(id) {
  // Delele kendaraan
  const { error: bookingTabelError } = await supabase
    .from("booking")
    .delete()
    .eq("id", id);
  if (bookingTabelError) {
    console.error("Gagal menghapus data rental: ", bookingTabelError);
    throw new Error("Gagal menghapus data rental");
  }
}

export async function editStatusTelat() {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("rental")
    .select("id, status, tanggalAkhir");

  if (error) {
    console.error("Gagal mengambil data rental:", error);
    return;
  }

  for (const item of data) {
    const isTelat =
      item.status !== "Selesai" &&
      item.status !== "Telat" &&
      item.status !== "Pending" &&
      item.tanggalAkhir < today;

    if (isTelat) {
      const { error: updateError } = await supabase
        .from("rental")
        .update({ status: "Telat" })
        .eq("id", item.id);

      if (updateError) {
        console.error(`Gagal update status untuk ID ${item.id}:`, updateError);
      } else {
        console.log(`Status rental ID ${item.id} diubah menjadi Telat.`);
      }
    }
  }
}
