import useCurrencyFormatInput from "../hooks/useCurrencyFormatInput";

function Input({
  icon,
  placeholder,
  type,
  inputType = "form",
  inputClass = "",
  onChange,
  value,
  disabled,
  minNumber,
  maxNumber,
  minLength = 10,
  maxLength = 200,
  ...props
}) {
  // Use custom hook to handle currency formatting
  const isCurrency = inputType === "currency";
  const { localValue, handleChange } = useCurrencyFormatInput(
    isCurrency,
    value,
    onChange,
  );

  return (
    <div
      className={`border-netral-400 focus-within:border-netral-900 flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 ${disabled ? "bg-netral-200 cursor-not-allowed" : ""}`}
    >
      {icon && <span>{icon}</span>}
      <input
        disabled={disabled}
        {...props}
        {...(type === "number" ? { min: minNumber, max: maxNumber } : {})}
        {...(type === "text" ? { minLength, maxLength } : {})}
        type={isCurrency ? "text" : type}
        value={isCurrency ? localValue : value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`placeholder:text-netral-600 w-80 border-none bg-transparent font-medium outline-none placeholder:text-sm ${inputClass}`}
      />
    </div>
  );
}

export default Input;
