function ButtonIcon({ icon, typeButton = "button", onEvent }) {
  return (
    <button type={typeButton} className="cursor-pointer" onClick={onEvent}>
      {icon}
    </button>
  );
}

export default ButtonIcon;
