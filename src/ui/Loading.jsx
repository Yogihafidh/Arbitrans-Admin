import Logo from "./Logo";

function Loading() {
  return (
    <div className="flex h-screen animate-bounce flex-col items-center justify-center gap-2 duration-1000">
      <Logo />
      <p className="text-lg">Sedang Login</p>
    </div>
  );
}

export default Loading;
