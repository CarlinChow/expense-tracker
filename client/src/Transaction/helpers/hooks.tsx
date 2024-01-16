import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction, updateTransaction } from "./utils"

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => (
            queryClient.invalidateQueries({queryKey: ['transaction']})
        ),
    })
    return deleteMutation
}

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: updateTransaction,
        onSuccess: () => (
            queryClient.invalidateQueries({queryKey: ['transaction']})
        )
    })
    return updateMutation
}