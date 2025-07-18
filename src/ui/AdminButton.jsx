function AdminButton({
  iconText,
  iconActive,
  iconPasif,
  text,
  isActive,
  setIsActive,
}) {
  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border-2 px-4 py-2 ${isActive ? "border-netral-600" : "border-netral-400"}`}
    >
      <div className="flex items-center gap-2">
        <span>{iconText}</span>
        <p>{text}</p>
      </div>
      <div className="transition-all duration-500">
        {isActive ? iconActive : iconPasif}
      </div>
    </button>
  );
}

export default AdminButton;
