import supabase, { supabaseUrl } from "./Supabase";

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

  console.log({ ...kendaraanData, status_kendaraan: "Tersedia" });

  // Insert kendaraan data
  const { data: kendaraanResult, error: kendaraanError } = await supabase
    .from("kendaraan")
    .insert([{ ...kendaraanData, status_kendaraan: "Tersedia" }])
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
    .insert(imageInsert)
    .select();

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

  // 4. Hapus darta dari tabel imageKendaraan
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
