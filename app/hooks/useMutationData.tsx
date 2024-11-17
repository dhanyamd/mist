import { toast } from "@/hooks/use-toast";
import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationData = (
    mutationKey : MutationKey,
    mutationFn : MutationFunction<any, any>,
    queryKey? : string,
    onSuccess? : () => void
) => {
   const client = useQueryClient()
   const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess()

      return toast(
        data?.status === 200 || data?.status === 201 ? 'Success' : 'Error',
        {
          description: data?.data,
        }
      )
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      })
    },
  })

  return { mutate, isPending }
} 