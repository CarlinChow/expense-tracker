import React, { useState } from 'react'
import { Text, View, StyleSheet, FlatList, ViewStyle, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native'
import TransactionItem from './TransactionItem'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../Common/helpers/utils'

const data = [{
    id: 1,
    amount: 25,
    date: "2023/12/31",
    description: "mcdonald's",
    transactionType: "EXPENSE" as const,
    category: {
        id: 1,
        name: "Food & Dining"
    },
},
{
    id: 2,
    amount: 600,
    date: "2023/12/31",
    description: "Nike Jordans",
    transactionType: "EXPENSE"  as const,
    category: {
        id: 2,
        name: "Shopping"
    },
},
{
    id: 3,
    amount: 100,
    date: "2023/12/31",
    description: "Gas",
    transactionType: "EXPENSE" as const, 
    category: {
        id: 3,
        name: "Auto & Transport"
    },
},
{
    id: 4,
    amount: 543.20,
    date: "2023/12/31",
    description: "from work",
    transactionType: "INCOME" as const,
},
{
    id: 5,
    amount: 543.20,
    date: "2023/12/31",
    description: "from work",
    transactionType: "INCOME" as const,
},
{
    id: 6,
    amount: 543.20,
    date: "2023/12/31",
    description: "from work",
    transactionType: "INCOME" as const,
},{
    id: 7,
    amount: 543.20,
    date: "2023/12/31",
    description: "from work",
    transactionType: "INCOME" as const,
}
]

const Body = () => {
    const { data, isError, isSuccess, isPending } = useQuery({
        queryKey: ['transaction'],
        queryFn: getTransactions
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Latest Transactions"}</Text>
            <View style={styles.card}>
                {isPending && <ActivityIndicator size='large'/>}
                {isSuccess && data.map((transaction, index) => {
                    if(index === data.length - 1){ // last item
                        return (<TransactionItem style={{borderBottomWidth: 0}} transaction={transaction} key={transaction.id}/>)
                    }else{
                        return (<TransactionItem transaction={transaction} key={transaction.id}/>)
                    }
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    title:{
        fontSize: 25,
        fontWeight: '700',
        alignSelf: 'flex-start'
    },
    card: {
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
})

export default Body