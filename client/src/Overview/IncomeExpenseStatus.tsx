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
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Text style={styles.text}>Income: </Text>
                <Text style={[styles.text, {color: '#6495ED', fontWeight: '800'}]}>${income}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.text}>Expenses: </Text>
                <Text style={[styles.text, {fontWeight: '700'}]}>-${expense}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    block: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 15,
    },
    text: {
        fontSize: 17,
        fontWeight: '700',
    }
})

export default IncomeExpenseStatus