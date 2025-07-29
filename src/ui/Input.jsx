import useCurrencyFormatInput from "../hooks/useCurrencyFormatInput";

function Input({
  icon,
  placeholder,
  type,
  isCurrency = false,
  isInputForm,
  inputClass = "",
  onChange,
  value,
  minNumber,
  maxNumber,
  minLength = 10,
  maxLength = 200,
  ...props
}) {
  // Use custom hook to handle currency formatting
  const { localValue, handleChange } = useCurrencyFormatInput(
    isCurrency,
    value,
    onChange,
  );

  return (
    <div
      className={`border-netral-400 flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 ${isInputForm ? "focus-within:border-netral-800 w-80 border-2" : "focus-within:ring-netral-600 focus-within:ring-2"}`}
    >
      {icon && <span>{icon}</span>}
      <input
        {...props}
        {...(type === "number" ? { min: minNumber, max: maxNumber } : {})}
        {...(type === "text" ? { minLength, maxLength } : {})}
        type={isCurrency ? "text" : type}
        value={isCurrency ? localValue : value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`placeholder:text-netral-600 w-60 border-none bg-transparent font-medium outline-none placeholder:text-sm ${isInputForm ? "w-80" : ""} ${inputClass}`}
      />
    </div>
  );
}

export default Input;
