export type Transaction = {
    id: number,
    amount: number,
    date: string,
    description: string,
    transactionType: "EXPENSE" | "INCOME"
    category?: Category
}

export type Category = {
    id: number, 
    name: string
}