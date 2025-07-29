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
