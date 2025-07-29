import { useEffect } from "react";

export function useClickOutside(ref, callback, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return;

    function handleClickOutside(event) {
      // Delay agar tidak langsung menutup saat tombol baru diklik
      setTimeout(() => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }, 0);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [callback, ref, isEnabled]);
}
