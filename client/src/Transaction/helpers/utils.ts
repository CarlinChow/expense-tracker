import { API_URL } from "@env"
import axios from 'axios'
import { Category, TransactionType } from "../../Common/types"
import { dateObjectToString } from "../../Common/helpers/utils"

export const deleteTransaction = (id:number) => {
    return axios.delete(`${API_URL}/transaction/${id}`)
}

type transactionParameterObj = {
    id: number,
    amount?: number,
    description?: string,
    date?: Date,
    category?: Category,
    transactionType: TransactionType,
}

export const updateTransaction = (data:transactionParameterObj) => {
    const { id, amount, description, date, category, transactionType } = data
    return axios.put(`${API_URL}/transaction/${transactionType === "EXPENSE" as const ? "expense" : "income"}/${id}`, {
        amount, 
        description,
        date: date ? dateObjectToString(date) : null,
        category
    })
}