import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../features/authentication/useUser";
import Loading from "./Loading";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <Loading />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
