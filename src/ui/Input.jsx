function Input({ icon, placeholder, inputType }) {
  return (
    <div
      className={`border-netral-400 flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 ${inputType === "inputForm" ? "focus-within:border-netral-800 border-2" : "focus-within:ring-netral-600 focus-within:ring-2"}`}
    >
      {icon && <span>{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        className={`placeholder:text-netral-600 w-60 border-none bg-transparent font-medium outline-none placeholder:text-sm ${inputType === "inputForm" ? "w-80" : ""}`}
      />
    </div>
  );
}

export default Input;
