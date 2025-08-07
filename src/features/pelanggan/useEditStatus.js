import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStatusRental as editStatusRentalApi } from "../../services/apiRental";
import toast from "react-hot-toast";

export function useEditStatus() {
  const queryClient = useQueryClient();
  const { isPending: isEdit, mutate: editStatusRental } = useMutation({
    mutationFn: editStatusRentalApi,
    onSuccess: () => {
      toast.success("Status rental berhasil diedit!");
      queryClient.invalidateQueries({
        queryKey: ["rental"],
      });
      queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEdit, editStatusRental };
}
