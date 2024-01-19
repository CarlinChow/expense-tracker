import { createTransaction } from './utils'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export const useCreateTransaction = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: createTransaction, 
        onSuccess: (_data, variables, context) => {
            const { date } = variables
            return queryClient.refetchQueries({ 
                queryKey: ['transaction', { month: date.getMonth(), year: date.getFullYear()}]
            })
        }
    })    
    return createMutation
}