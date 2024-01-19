import type { TransactionType, Category } from "../../Common/types"
import axios from 'axios'
import { API_URL } from "@env"
import { dateObjectToString } from "../../Common/helpers/utils"

type transactionParameterObj = {
    amount: number,
    date: Date,
    description: string,
    transactionType: TransactionType,
    category?: Category
}

export const createTransaction = (data:transactionParameterObj) => {
    const { amount, date, description, transactionType, category } = data
    return axios.post(`${API_URL}/transaction/${transactionType === 'EXPENSE' as const ? 'expense' : 'income'}`, {
        amount,
        date: dateObjectToString(date),
        description,
        category,
    })
}