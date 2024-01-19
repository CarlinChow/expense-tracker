import { Transaction, TransactionType } from "../../Common/types";

export type SectionFormattedData = {
    title: string,
    data: Transaction[]
}

export const groupByCategory = (input:Transaction[], filter:TransactionType | null):SectionFormattedData[] => {
    const incomeData = {
        title: "Income",
        data: input.filter(item => item.transactionType === 'INCOME'),
    }
    if(filter === 'INCOME'){
        return incomeData.data.length === 0 ? [] : [incomeData]
    }
	const groups = input.filter(item => item.transactionType === 'EXPENSE').reduce((acc:any, currentValue:any) => {
	  let groupKey = currentValue.category["name"];
	  if (!acc[groupKey]) {
		acc[groupKey] = [];
	  }
	  acc[groupKey].push(currentValue);
	  return acc;
	}, {})
    const res = []
    for(let key in groups){
        res.push({
            title: key,
            data: groups[key]
        })
    }
    if(filter === null && incomeData.data.length !== 0){
        res.push(incomeData)
    }
    return res
}

export const groupByDate = (input:Transaction[], filter:TransactionType | null):SectionFormattedData[] => {
    let filteredInput = input
    if(filter === 'EXPENSE'){
        filteredInput = input.filter(item => item.transactionType === 'EXPENSE')
    }else if(filter === 'INCOME'){
        filteredInput = input.filter(item => item.transactionType === 'INCOME')
    }
	const groups = filteredInput.reduce((acc:any, currentValue:any) => {
	    let groupKey = currentValue["date"];
	    if (!acc[groupKey]) {
		    acc[groupKey] = [];
	    }
	    acc[groupKey].push(currentValue);
	    return acc;
	}, {})
    const res = []
    for(let key in groups){
        res.push({
            title: key,
            data: groups[key]
        })
    }
    return res
}