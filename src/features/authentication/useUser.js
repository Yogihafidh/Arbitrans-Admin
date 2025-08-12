import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onError: (error) => {
      console.error(error);
      toast.error("Email atau Password salah!");
    },
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
