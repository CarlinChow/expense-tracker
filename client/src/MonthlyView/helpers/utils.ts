import type { Transaction } from "../../Common/types"

export const calculateChartData = (data:Transaction[]) => {
    const groups = data.filter(item => item.transactionType === 'EXPENSE').reduce((acc:any, currentValue:any) => {
        let groupKey = currentValue.category["name"];
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(currentValue);
        return acc;
        }, {})
    const res = []
    for(let key in groups){
        const sum = groups[key].reduce((acc:number, b:Transaction) => {
            return acc + b.amount
        }, 0)
        res.push({
            amount: sum,
            category: {
                name: key
            }
        })
    }
    return res
}