import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKendaraan as createKendaraanApi } from "../../services/apiKendaraan";
import toast from "react-hot-toast";

export function useCreateKendaraan() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createKendaraan } = useMutation({
    mutationFn: createKendaraanApi,
    onSuccess: () => {
      toast.success("Kendaraan berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createKendaraan };
}
