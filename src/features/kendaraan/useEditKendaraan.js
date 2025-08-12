import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editKendaraan as editKendaraanApi } from "../../services/apiKendaraan";
import toast from "react-hot-toast";

export function useEditKendaraan() {
  const queryClient = useQueryClient();
  const { isPending: isEdit, mutate: editKendaraan } = useMutation({
    mutationFn: editKendaraanApi,
    onSuccess: () => {
      toast.success("Kendaraan berhasil diedit");

      queryClient.invalidateQueries({
        queryKey: ["kendaraan"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEdit, editKendaraan };
}
