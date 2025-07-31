import React from "react";
import toast from "react-hot-toast";

// Komponen `FileInput` menerima props:
// - label: teks pada tombol upload
// - onChange: fungsi yang dipanggil saat file berubah
// - name, accept: properti input
// - value: array file yang sudah dipilih (dikontrol dari luar)
function FileInput(
  { label = "Upload file", onChange, name, accept, value = [] },
  ref,
) {
  const handleChange = (e) => {
    // 1. Ubah dari FileList ke array biasa
    let selectedFiles = Array.from(e.target.files);

    // 2. Batasi jumlah maksimal file yang dipilih menjadi 5
    if (selectedFiles.length > 5) {
      // Ambil hanya 5 file pertama
      selectedFiles = selectedFiles.slice(0, 5);
      toast.error("Maksimal 5 file yang dapat dipilih.");
    }

    // 3. Kirim file ke parent component (React Hook Form)
    onChange?.(selectedFiles);
  };

  const removeImage = (indexToRemove) => {
    // 1. Hapus file dari array
    const updated = value.filter((_, index) => index !== indexToRemove);

    // 2. Kirim file yang sudah dihapus ke parent
    onChange?.(updated);
  };

  return (
    <div>
      {/* Input Button */}
      <label className="inline-flex cursor-pointer items-center gap-3">
        <span className="bg-primary rounded-lg px-4 py-2 text-sm text-white transition-colors">
          {label}
        </span>
        {/* Input file disembunyikan, dikendalikan lewat label */}
        <input
          type="file"
          name={name}
          accept={accept}
          className="hidden"
          ref={ref}
          multiple
          onChange={handleChange}
        />
      </label>

      {/* Preview gambar */}
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((file, index) => {
          const preview =
            file instanceof File ? URL.createObjectURL(file) : file.url_gambar; // Buat URL untuk ditampilkan sebagai gambar

          return (
            <div key={index} className="group relative">
              <img
                src={preview}
                alt={`preview-${index}`}
                className="h-20 w-20 rounded border object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-[-4px] right-[-4px] z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-600 text-xs text-white"
                title="Hapus"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1665 12.008L20.762 4.43822C21.0793 4.11791 21.0793 3.599 20.762 3.27868C20.4503 2.95264 19.9355 2.94285 19.6118 3.2568L12.0163 10.8266L4.51839 3.2568C4.36467 3.09288 4.15078 3 3.92702 3C3.70327 3 3.48938 3.09288 3.33566 3.2568C3.0543 3.56628 3.0543 4.04123 3.33566 4.35071L10.8335 11.9096L3.238 19.4685C2.92067 19.7888 2.92067 20.3077 3.238 20.628C3.38907 20.784 3.59685 20.871 3.81309 20.8687C4.03351 20.8867 4.25202 20.8159 4.42074 20.6718L12.0163 13.102L19.6118 20.7593C19.7629 20.9153 19.9707 21.0022 20.1869 21C20.4029 21.001 20.6102 20.9142 20.762 20.7593C21.0793 20.439 21.0793 19.9201 20.762 19.5998L13.1665 12.008Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.forwardRef(FileInput);
