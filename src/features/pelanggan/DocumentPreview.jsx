import React, { useState } from "react";

function isPDF(url) {
  if (!url) return false;
  return url.toLowerCase().endsWith(".pdf");
}

function DocumentPreview({ urls = {}, name = "Dokumen" }) {
  const items = [
    { key: "ktpPenyewa", label: "KTP Penyewa" },
    { key: "ktpPenjamin", label: "KTP Penjamin" },
    { key: "simA", label: "SIM Aktif" },
    { key: "tiketKereta", label: "Tiket Kereta" },
    { key: "idKaryawan", label: "ID Karyawan" },
  ];

  const available = items.filter((it) => urls[it.key]);
  const [selected, setSelected] = useState(available.length ? available[0].key : null);

  if (!available.length) {
    return (
      <div className="w-[720px] max-w-[90vw] bg-white p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Preview Dokumen</h3>
        <p className="text-sm text-netral-600">Tidak ada dokumen yang diunggah untuk pengguna ini.</p>
      </div>
    );
  }

  const currentUrl = selected ? urls[selected] : null;

  return (
    <div className="w-[900px] max-w-[95vw] bg-white p-6 rounded-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Preview Dokumen</h3>
          <p className="text-sm text-netral-500">{name}</p>
        </div>
        <div className="flex gap-2">
          {available.map((it) => (
            <button
              key={it.key}
              onClick={() => setSelected(it.key)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${selected === it.key ? "bg-acent-blue/10 text-acent-blue" : "bg-netral-100"}`}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {currentUrl ? (
          isPDF(currentUrl) ? (
            <iframe
              src={currentUrl}
              title="preview-pdf"
              className="w-full h-[70vh] border"
            />
          ) : (
            <img src={currentUrl} alt="preview" className="w-full max-h-[70vh] object-contain border" />
          )
        ) : (
          <p className="text-sm text-netral-500">Tidak ada file untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
}

export default DocumentPreview;
