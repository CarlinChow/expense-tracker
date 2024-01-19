import { useQuery } from '@tanstack/react-query'
import { getTransactionsByMonth } from './utils'

export const useGetTransactionByMonth = (obj: {month: number, year: number}) => {
    const { month, year } = obj
    const getTransactionByMonth = useQuery({
        queryKey: ['transaction', {month, year}], 
        queryFn: () => getTransactionsByMonth({month, year}),
        staleTime: Infinity,
        gcTime: Infinity
    })
    return getTransactionByMonth
}