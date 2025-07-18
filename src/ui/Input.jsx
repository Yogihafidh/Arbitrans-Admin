function Input({ icon, placeholder }) {
  return (
    <div className="border-netral-400 focus-within:ring-netral-600 flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 focus-within:ring-2">
      {icon && <span>{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        className="placeholder:text-netral-600 w-full border-none bg-transparent font-medium outline-none placeholder:text-sm"
      />
    </div>
  );
}

export default Input;
