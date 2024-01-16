export type Transaction = {
    id: number,
    amount: number,
    date: string,
    description: string,
    transactionType: TransactionType,
    category?: Category,
}

export type TransactionType = "EXPENSE" | "INCOME"

export type Category = {
    categoryType: CategoryType,
    id: number,
    name: string,
}

export type CategoryType = "DEFAULT" | "CUSTOM"