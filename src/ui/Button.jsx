const buttonType = {
  primary:
    "bg-primary text-netral-100 border-primary hover:bg-primary/10 hover:text-primary",
  secondary: "bg-primary/10 text-primary hover:bg-primary/30 border-none",
  logout:
    "border-acent-red bg-acent-red-100 text-acent-red hover:bg-acent-red hover:border-white hover:text-white border-2",
  delete:
    "bg-acent-red/10 text-acent-red hover:bg-acent-red hover:text-white border-none",
};

function Button({
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  text,
  type = "primary",
  typeButton = "button",
  className,
  ...props
}) {
  return (
    <button
      type={typeButton}
      disabled={disabled}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 ${buttonType[type] || buttonType["primary"]} ${className} `}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {text && <p>{text}</p>}
      {rightIcon && <span>{rightIcon && rightIcon}</span>}
    </button>
  );
}

export default Button;
