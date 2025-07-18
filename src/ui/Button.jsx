function Button({ handleClick, leftIcon, rightIcon, text, className }) {
  return (
    <button
      onClick={handleClick}
      className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border-2 px-4 py-2 ${className} `}
    >
      <span>{leftIcon && leftIcon}</span>
      <p>{text}</p>
      <span>{rightIcon && rightIcon}</span>
    </button>
  );
}

export default Button;
