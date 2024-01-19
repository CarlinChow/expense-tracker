import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import TransactionItem from './TransactionItem'
import { useGetTransactionByMonth } from '../Common/helpers/hooks'

const today = new Date()
const month = today.getMonth()
const year = today.getFullYear()

const Body = () => {
    const { data, status } = useGetTransactionByMonth({month, year})
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Latest Transactions"}</Text>
            <View style={styles.card}>
                {status === 'pending' && <ActivityIndicator size='large'/>}
                {status === 'success' && data.reverse().slice(0, 10).map((transaction) => {
                    return (<TransactionItem transaction={transaction} key={transaction.id}/>)   
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 15,
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
        display: 'flex',
        gap: 10,
        paddingBottom: 20,
    },
})

export default Body