import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Logo from "./logo";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading)
    return (
      <div className="flex h-screen animate-bounce flex-col items-center justify-center gap-2 duration-1000">
        <Logo />
        <p className="text-lg">Sedang Login</p>
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
