import { createTransaction } from './utils'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const useCreateTransaction = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: createTransaction, 
        onSuccess: () => (
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
        )
    })    
    return createMutation
}