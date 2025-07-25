import { useEffect } from "react";

export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      // Delay agar tidak langsung menutup saat tombol baru diklik
      setTimeout(() => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }, 0); // cukup delay 1 tick
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [callback, ref]);
}
