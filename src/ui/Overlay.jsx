function Overlay({ onCloseModal }) {
  return (
    <div
      onClick={() => onCloseModal?.()}
      className="fixed top-0 right-0 bottom-0 left-0 z-40 h-screen w-full backdrop-blur-xs transition-all duration-300"
    ></div>
  );
}

export default Overlay;
