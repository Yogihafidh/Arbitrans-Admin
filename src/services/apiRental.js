import { format } from "date-fns";
import supabase, { supabaseUrl } from "./supabase";

const DOCUMENT_COLUMNS = [
  "url_ktp_penyewa",
  "url_ktp_penjamin",
  "url_id_karyawan",
  "url_sim_a",
  "url_tiket_kereta",
];

export async function getRentalKendaraan(filter) {
  let query = supabase
    .from("booking")
    .select(
      "id, nama_pelanggan, no_telephone, nik, alamat, tanggal_mulai, tanggal_akhir, status, total_harga, lokasi_pengambilan, lokasi_pengembalian, jenis_sewa, helm, mantel, waktu_pengambilan, waktu_pengembalian, url_ktp_penyewa, url_ktp_penjamin, url_id_karyawan, url_sim_a, url_tiket_kereta, kendaraan(id, nama_kendaraan, harga_sewa, tipe_kendaraan, jenis_kendaraan, imageKendaraan(url_gambar))",
    )
    .order("tanggal_akhir");

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
  const { data: bookingData, error: fetchError } = await supabase
    .from("booking")
    .select(DOCUMENT_COLUMNS.join(","))
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Gagal mengambil data dokumen rental: ", fetchError);
    throw new Error("Gagal mengambil dokumen rental");
  }

  const filesByBucket = DOCUMENT_COLUMNS.reduce((acc, column) => {
    const info = extractStorageInfo(bookingData?.[column]);
    if (!info) return acc;
    if (!acc[info.bucket]) acc[info.bucket] = [];
    acc[info.bucket].push(info.path);
    return acc;
  }, {});

  for (const [bucket, files] of Object.entries(filesByBucket)) {
    if (!files.length) continue;
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove(files);

    if (storageError) {
      console.error(
        `Gagal menghapus dokumen ${bucket} dari storage: `,
        storageError,
      );
      throw new Error("Gagal menghapus dokumen dari penyimpanan");
    }
  }

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
  const today = format(new Date(), "yyyy-MM-dd");

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

function extractStorageInfo(url) {
  if (!url || typeof url !== "string") return null;
  const publicPrefix = `${supabaseUrl}/storage/v1/object/public/`;
  if (!url.startsWith(publicPrefix)) return null;
  const relativePath = url.replace(publicPrefix, "");
  const [bucket, ...pathParts] = relativePath.split("/");
  if (!bucket || pathParts.length === 0) return null;
  return { bucket, path: pathParts.join("/") };
}
