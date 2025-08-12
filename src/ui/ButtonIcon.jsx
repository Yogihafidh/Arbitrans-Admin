function ButtonIcon({ icon, typeButton = "button", onEvent, className }) {
  return (
    <button
      type={typeButton}
      className={`cursor-pointer ${className}`}
      onClick={onEvent}
    >
      {icon}
    </button>
  );
}

export default ButtonIcon;
