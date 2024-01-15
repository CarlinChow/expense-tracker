import { API_URL } from "@env"
import axios from 'axios'
import { Category } from "../../Common/types"

export const deleteTransaction = (id:number) => {
    return axios.delete(`${API_URL}/transaction/${id}`)
}

type transactionParameteObj = {
    id: number,
    amount?: number,
    description?: string,
    date?: string,
    category?: Category,
    transactionType: "EXPENSE" | "INCOME"
}

export const updateTransaction = (data:transactionParameteObj) => {
    const { id, amount, description, date, category, transactionType } = data
    return axios.put(`${API_URL}/transaction/${transactionType === "EXPENSE" as const ? "expense" : "income"}/${id}`, {
        amount, 
        description,
        date,
        category
    })
}