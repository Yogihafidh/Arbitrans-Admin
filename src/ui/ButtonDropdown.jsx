import { cloneElement, memo, useCallback, useRef, useState } from "react";
// import { useClickOutside } from "../hooks/useClikOutside";

function ButtonDropdown({
  iconText,
  iconActive,
  iconPasif,
  text,
  children,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  console.log(isOpen);

  const containerRef = useRef(null);

  // useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
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

      {isOpen && cloneElement(children, { close })}
    </div>
  );
}

export default memo(ButtonDropdown);
