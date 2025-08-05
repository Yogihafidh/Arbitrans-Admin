import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRental as editRentalApi } from "../../services/apiRental";
import toast from "react-hot-toast";

export function useEditRental() {
  const queryClient = useQueryClient();
  const { isPending: isEdit, mutate: editRental } = useMutation({
    mutationFn: editRentalApi,
    onSuccess: () => {
      toast.success("Rental kendaraan berhasil diedit!");
      queryClient.invalidateQueries({
        queryKey: ["rental"],
      });
      queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEdit, editRental };
}
