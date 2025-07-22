import { useState } from "react";

function FileInput({ label = "Upload file", ...props }) {
  const [fileName, setFileName] = useState(
    "Tidak ada file dipilih (3 -5 Foto)",
  );

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Tidak ada file dipilih (3 -5 Foto)");
  };

  return (
    <div>
      <label className="inline-flex cursor-pointer items-center gap-3">
        <span className="bg-primary rounded-lg px-4 py-2 text-sm text-white transition-colors">
          {label}
        </span>
        <span className="max-w-[200px] truncate text-sm text-gray-600">
          {fileName}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          {...props}
        />
      </label>
    </div>
  );
}

export default FileInput;
