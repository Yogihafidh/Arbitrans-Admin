import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStatusKendaraan as editStatusKendaraanApi } from "../../services/apiRental";
import toast from "react-hot-toast";

export function useEditStatus() {
  const queryClient = useQueryClient();
  const { isPending: isEdit, mutate: editStatusKendaraan } = useMutation({
    mutationFn: editStatusKendaraanApi,
    onSuccess: () => {
      toast.success("Status kendaraan berhasil diedit!");
      queryClient.invalidateQueries({
        queryKey: ["rental"],
      });
      queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEdit, editStatusKendaraan };
}
