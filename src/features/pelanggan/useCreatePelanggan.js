import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRental as createRentalApi } from "../../services/apiRental";
import toast from "react-hot-toast";

export function useCreateRental() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createRental } = useMutation({
    mutationFn: createRentalApi,
    onSuccess: () => {
      toast.success("Pelanggan berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["rental"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createRental };
}
