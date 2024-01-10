import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from './Header'
import IncomeExpenseStatus from './IncomeExpenseStatus';

// http request for transaction data here

const HomeScreen = () => {
    const income = 4000
    const expense = 2500
    const upcomingExpense = 500

    return (
        <ScrollView style={styles.container}>
            <Header income={income} expense={expense}/>
            <IncomeExpenseStatus income={income} expense={expense} upcomingExpense={upcomingExpense}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
    }
})

export default HomeScreen;