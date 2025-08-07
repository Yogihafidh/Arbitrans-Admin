import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRental as deleteRentalApi } from "../../services/apiRental";
import toast from "react-hot-toast";

export function useDeleteRental() {
  const queryClient = useQueryClient();
  const { isPending: isDelete, mutate: deleteRental } = useMutation({
    mutationFn: deleteRentalApi,
    onSuccess: () => {
      toast.success("Rental berhasil dihapus!");
      queryClient.invalidateQueries({
        queryKey: ["rental"],
      });
      queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDelete, deleteRental };
}
