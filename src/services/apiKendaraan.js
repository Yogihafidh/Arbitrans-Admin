import { format } from "date-fns";
import supabase, { supabaseUrl } from "./Supabase";

export async function getKendaraanTersediaHariIni() {
  const today = format(new Date(), "yyyy-MM-dd");

  // Ambil ID kendaraan yang sedang disewa hari ini
  const { data: kendaraanSedangDisewa, error: errorRental } = await supabase
    .from("booking")
    .select("id_kendaraan")
    .or(
      `and(tanggal_mulai.lte.${today},tanggal_akhir.gte.${today},status.neq.Selesai),and(tanggal_akhir.lt.${today},status.eq.Telat)`,
    );

  if (errorRental) {
    console.error("Error pada rental: ", errorRental);
    throw new Error("Gagal cek data rental.");
  }

  // Ambil semua ID kendaraan yang sedang disewa hari ini ke dalam array
  const idSedangDisewa =
    kendaraanSedangDisewa?.map((rental) => rental.id_kendaraan) ?? [];

  // Inisialisasi query kendaraan yang tersedia
  let kendaraanTersediaQuery = supabase
    .from("kendaraan")
    .select("*, imageKendaraan(url_gambar)")
    .order("nama_kendaraan");

  // Jika ada kendaraan yang sedang disewa hari ini, tambahkan filter NOT IN agar tidak ditampilkan
  if (idSedangDisewa.length > 0) {
    kendaraanTersediaQuery = kendaraanTersediaQuery.filter(
      "id",
      "not.in",
      `(${idSedangDisewa.join(",")})`,
    );
  }

  // Eksekusi query untuk mengambil kendaraan yang tersedia hari ini
  const { data: kendaraanTersedia, error: errorKendaraanTersedia } =
    await kendaraanTersediaQuery;

  if (errorKendaraanTersedia) {
    console.error("Error di kendaraan yang tersedia", errorKendaraanTersedia);
    throw new Error("Data kendaraan tidak bisa diambil.");
  }

  // Kembalikan data kendaraan yang tersedia hari ini
  return kendaraanTersedia;
}

export async function getKendaraan(filter) {
  const query = supabase
    .from("kendaraan")
    .select("*, imageKendaraan(url_gambar)")
    .order("nama_kendaraan");

  if (filter) query.eq(filter.field, filter.value);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(
      "Data kendaraan tidak bisa diambil. Coba beberapa menit lagi!.",
    );
  }

  return data;
}

export async function createKendaraan(newKendaraan) {
  // Memisahkan data image dengan kendaraan
  const { gambar, ...kendaraanData } = newKendaraan;

  const hasImagePath = gambar?.every((image) =>
    String(image.name).startsWith(supabaseUrl),
  );

  const imageName = gambar?.map((image) =>
    `${Math.random()}-${image.name}`.replace("/", ""),
  );

  const imagePath = hasImagePath
    ? gambar
    : gambar?.map(
        (_, i) =>
          `${supabaseUrl}/storage/v1/object/public/kendaraan/${imageName[i]}`,
      );

  // Upload image to bucket
  if (!hasImagePath && gambar) {
    for (let i = 0; i < gambar.length; i++) {
      const { error: storageError } = await supabase.storage
        .from("kendaraan")
        .upload(imageName[i], gambar[i]);

      if (storageError) {
        console.error("Upload gambar gagal: ", storageError);
        throw new Error("Gagal upload gambar kendaraan, coba lagi!");
      }
    }
  }

  // Insert kendaraan data
  const { data: kendaraanResult, error: kendaraanError } = await supabase
    .from("kendaraan")
    .insert([{ ...kendaraanData }])
    .select();

  if (kendaraanError) {
    // Jika gagal, HAPUS semua gambar yang sudah diupload
    await supabase.storage.from("kendaraan").remove(imageName);

    console.error("Insert data kendaraan gagal: ", kendaraanError);
    throw new Error("Kendaraan gagal ditambahkan, coba hubungi admin!");
  }

  // Insert Image kendaraan data
  const idKendaraan = kendaraanResult[0].id;
  const imageInsert = imagePath.map((url) => ({
    url_gambar: url,
    id_kendaraan: idKendaraan,
  }));

  const { error: imageError } = await supabase
    .from("imageKendaraan")
    .insert(imageInsert);

  if (imageError) {
    // Rollback kendaraan
    await supabase.from("kendaraan").delete().eq("id", idKendaraan);

    // Jika gagal, HAPUS semua gambar yang sudah diupload
    await supabase.storage.from("kendaraan").remove(imageName);

    console.error("Insert data image kendaraan gagal: ", imageError);
    throw new Error(
      "Data image kendaraan gagal ditambahkan, segera hubungin admin",
    );
  }
}

export async function deleteKendaraan(id) {
  // 1. Ambil data gambar dari tabel imageKendaraan
  const { data: imageData, error: imageFetchError } = await supabase
    .from("imageKendaraan")
    .select("url_gambar")
    .eq("id_kendaraan", id);

  if (imageFetchError) {
    console.error("Gagal mengambil data gambar kendaraan: ", imageFetchError);
    throw new Error("Gagal mengambil data gambar kendaraan");
  }

  // 2. Extrak nama file dari URL
  const imageNames = imageData.map((image) =>
    image.url_gambar.replace(
      `${supabaseUrl}/storage/v1/object/public/kendaraan/`,
      "",
    ),
  );

  // 3. Delete file gamabr kendaraan dari bucket
  if (imageNames.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("kendaraan")
      .remove(imageNames);
    if (storageError) {
      console.error("Gagal menghapus gambar dari storage: ", storageError);
      throw new Error("Gagal menghapus gambar dari penyimpanan");
    }
  }

  // 4. Hapus data dari tabel imageKendaraan
  if (imageNames.length > 0) {
    const { error: imageDeleteError } = await supabase
      .from("imageKendaraan")
      .delete()
      .eq("id_kendaraan", id);
    if (imageDeleteError) {
      console.error(
        "Gagal menghapus data gambar kendaraan: ",
        imageDeleteError,
      );
      throw new Error("Gagal menghapus data gambar kendaraan");
    }
  }

  // 5. Hapus data dari tabel kendaraan
  const { data, error: kendaraanDeleteError } = await supabase
    .from("kendaraan")
    .delete()
    .eq("id", id);

  if (kendaraanDeleteError) {
    console.error("Gagal menghapus kendaraan: ", kendaraanDeleteError);
    throw new Error("Kendaraan tidak bisa dihapus");
  }

  return data;
}

export async function editKendaraan(kendaraan) {
  // Memisahkan data image dengan kendaraan
  const { gambar, ...kendaraanData } = kendaraan;

  // Cek apakah edit atau create, jika edit pasti memiliki supabaseUrl
  const hasImagePath = gambar?.every(
    (image) =>
      typeof image.url_gambar === "string" &&
      image.url_gambar.startsWith(supabaseUrl),
  );

  // Membuat format nama file baru
  const imageName = gambar?.map((image) =>
    `${Math.random()}-${image.name}`.replace("/", ""),
  );

  // Membuat path image untuk ditambahkan di tabel imageKendaraan
  const imagePath = hasImagePath
    ? gambar
    : gambar?.map(
        (_, i) =>
          `${supabaseUrl}/storage/v1/object/public/kendaraan/${imageName[i]}`,
      );

  // Ambil data gambar dari tabel imageKendaraan
  const { data: imageData, error: imageFetchError } = await supabase
    .from("imageKendaraan")
    .select("url_gambar")
    .eq("id_kendaraan", kendaraan.id);

  if (imageFetchError) {
    console.error("Gagal mengambil data gambar kendaraan: ", imageFetchError);
    throw new Error("Gagal mengambil data gambar kendaraan");
  }

  // Format untuk cuma mendapatkan nama tanpa path
  const imageNameOld = imageData?.map((image) =>
    image.url_gambar.replace(
      `${supabaseUrl}/storage/v1/object/public/kendaraan/`,
      "",
    ),
  );

  // 1. Upload gambar baru ke bucket (kondisi ketika ada gambar baru atau hasImagePath === false)
  if (!hasImagePath) {
    // a. Hapus semua gambar yang diupload sebelumnya
    await supabase.storage.from("kendaraan").remove(imageNameOld);

    // b. Hapus semua data di tabel imageKendaraan
    const { error: imageDeleteError } = await supabase
      .from("imageKendaraan")
      .delete()
      .eq("id_kendaraan", kendaraan.id);
    if (imageDeleteError) {
      console.error(
        "Gagal menghapus data gambar kendaraan: ",
        imageDeleteError,
      );
      throw new Error("Gagal memperbarui data gambar kendaraan");
    }

    // c. Upload gambar yang baru
    for (let i = 0; i < gambar.length; i++) {
      const { error: storageError } = await supabase.storage
        .from("kendaraan")
        .upload(imageName[i], gambar[i]);
      if (storageError) {
        console.error("Upload gambar gagal: ", storageError);
        throw new Error("Gagal memperbarui gambar kendaraan, coba lagi!");
      }
    }
  }

  // 2. Update kendaraan data
  const { data: kendaraanResult, error: kendaraanError } = await supabase
    .from("kendaraan")
    .update({ ...kendaraanData })
    .eq("id", kendaraan.id)
    .select();

  if (!kendaraanResult || kendaraanResult.length === 0) {
    throw new Error(
      "Data kendaraan tidak ditemukan atau tidak berhasil diupdate.",
    );
  }

  if (kendaraanError) {
    // a. Hapus semua gambar di bucket kendaraan yang diupload sebelumnya
    await supabase.storage.from("kendaraan").remove(imageNameOld);

    // b. Hapus semua data di tabel imageKendaraan
    const { error: imageDeleteError } = await supabase
      .from("imageKendaraan")
      .delete()
      .eq("id_kendaraan", kendaraan.id);
    if (imageDeleteError) {
      console.error(
        "Gagal menghapus data gambar kendaraan: ",
        imageDeleteError,
      );
      throw new Error("Gagal memperbarui data gambar kendaraan");
    }

    // c. Berikan Respon
    console.error("Update data kendaraan gagal: ", kendaraanError);
    throw new Error("Kendaraan gagal diupdate, coba hubungi admin!");
  }

  // 3. Insert Tabel imageKendaraan data
  if (!hasImagePath) {
    const idKendaraan = kendaraanResult[0].id;
    const imageInsert = imagePath.map((url) => ({
      url_gambar: url,
      id_kendaraan: idKendaraan,
    }));

    const { error: imageError } = await supabase
      .from("imageKendaraan")
      .insert(imageInsert)
      .select();

    if (imageError) {
      // Rollback kendaraan
      await supabase.from("kendaraan").delete().eq("id", idKendaraan);

      // Hapus semua gambar di bucket kendaraan
      await supabase.storage.from("kendaraan").remove(imageName);

      // Beri respon
      console.error("Insert data image kendaraan gagal: ", imageError);
      throw new Error(
        "Data image kendaraan gagal ditambahkan, segera hubungin admin",
      );
    }
  }
}
