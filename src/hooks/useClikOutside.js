import { useEffect } from "react";

/**
 * Hook untuk mendeteksi klik di luar elemen.
 * @param {Object} mainRef - Ref utama elemen yang dilindungi.
 * @param {Function} callback - Fungsi yang dijalankan saat klik di luar elemen.
 * @param {Array|Object} ignoreRefs - Ref tambahan yang diabaikan (misalnya tombol pembuka).
 * @param {Boolean} isEnabled - Untuk mengaktifkan/menonaktifkan deteksi.
 */
export function useClickOutside(
  mainRef,
  callback,
  ignoreRefs = [],
  isEnabled = true,
) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (event) => {
      const ignoredArray = Array.isArray(ignoreRefs)
        ? ignoreRefs
        : [ignoreRefs];

      const clickedInsideMain = mainRef.current?.contains(event.target);
      const clickedIgnored = ignoredArray.some((ref) =>
        ref?.current?.contains(event.target),
      );

      if (!clickedInsideMain && !clickedIgnored) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mainRef, callback, ignoreRefs, isEnabled]);
}
