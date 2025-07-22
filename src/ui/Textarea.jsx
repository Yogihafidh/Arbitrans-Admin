function TextArea({ icon, placeholder, inputType, rows = 4 }) {
  return (
    <div
      className={`border-netral-400 flex w-full gap-2 rounded-lg border-2 px-4 py-2 ${
        inputType === "inputForm"
          ? "focus-within:border-netral-800 border-1"
          : "focus-within:ring-netral-600 focus-within:ring-2"
      }`}
    >
      {icon && <span>{icon}</span>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className={`placeholder:text-netral-600 w-full resize-none border-none bg-transparent font-medium outline-none placeholder:text-sm ${
          inputType === "inputForm" ? "w-80" : ""
        }`}
      ></textarea>
    </div>
  );
}

export default TextArea;
