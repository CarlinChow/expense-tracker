import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export type Props = {
    income: number,
    expense: number,
    upcomingExpense: number,
}

const IncomeExpenseStatus: React.FC<Props> = ({
    income,
    expense,
    upcomingExpense
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Text style={styles.text}>Income: </Text>
                <Text style={styles.text}>${income}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.text}>Expense: </Text>
                <Text style={styles.text}>${expense}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.text}>Upcoming Expense:</Text>
                <Text style={styles.text}>${upcomingExpense}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10,
        gap: 5,
    },
    block: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
    }
})

export default IncomeExpenseStatus