function ButtonIcon({ icon, onEvent }) {
  return (
    <button className="cursor-pointer" onClick={onEvent}>
      {icon}
    </button>
  );
}

export default ButtonIcon;
