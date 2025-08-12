function EmptyMessage({ heading, message, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <img src="/public/animation.png" />
      <p className="text-netral-900 font-semibold">{heading}</p>
      <p className="text-netral-700">{message}</p>
    </div>
  );
}

export default EmptyMessage;
