import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteKendaraan as deleteKendaraanApi } from "../../services/apiKendaraan";
import toast from "react-hot-toast";

export function useDeleteKendaraan() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteKendaraan } = useMutation({
    mutationFn: deleteKendaraanApi,
    onSuccess: () => {
      toast.success("Kendaraan berhasil dihapus!");

      queryClient.invalidateQueries({
        queryKey: ["kendaraan"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteKendaraan };
}
