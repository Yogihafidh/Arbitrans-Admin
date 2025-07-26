import { memo, useRef, useState } from "react";
// import { useClickOutside } from "../hook/useClikOutside";

function ButtonDropdown({
  iconText,
  iconActive,
  iconPasif,
  text,
  children,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  console.log(isOpen);

  // useClickOutside(containerRef, () => setIsOpen(false));
  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        onClick={handleClick}
        className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border-2 px-4 py-2 ${
          isOpen ? "border-netral-600" : "border-netral-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>{iconText}</span>
          <p>{text}</p>
        </div>
        <div className="transition-all duration-500">
          {isOpen ? iconActive : iconPasif}
        </div>
      </button>

      {isOpen && children}
    </div>
  );
}

export default memo(ButtonDropdown);
