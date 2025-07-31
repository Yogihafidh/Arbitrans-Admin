function TextArea({ icon, placeholder, rows = 4, ...props }) {
  return (
    <div
      className={`border-netral-400 focus-within:border-netral-900 flex w-full gap-2 rounded-lg border-2 px-4 py-2`}
    >
      {icon && <span>{icon}</span>}
      <textarea
        {...props}
        placeholder={placeholder}
        rows={rows}
        className={`placeholder:text-netral-600 w-full resize-none border-none bg-transparent font-medium outline-none placeholder:text-sm`}
      ></textarea>
    </div>
  );
}

export default TextArea;
