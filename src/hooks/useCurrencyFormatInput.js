import { useEffect, useState } from "react";
import { convertRupiah } from "../utils/helper";

export default function useCurrencyFormatInput(isCurrency, value, onChange) {
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    if (!isCurrency) return;
    setLocalValue(convertRupiah(value || ""));
  }, [value, isCurrency]);

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (isCurrency) {
      setLocalValue(convertRupiah(e.target.value));
      if (onChange) {
        onChange({ target: { value: raw } });
      }
    } else {
      onChange?.(e);
    }
  };

  return {
    localValue,
    handleChange,
  };
}
