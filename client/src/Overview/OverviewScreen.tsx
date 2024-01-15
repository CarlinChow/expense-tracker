import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Header from './Header'
import Body from './Body'
import IncomeExpenseStatus from './IncomeExpenseStatus';
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../Common/helpers/utils';
import type { OverviewScreenProps } from './types';

const OverviewScreen:React.FC<OverviewScreenProps> = ({ navigation }) => {
    const { data, status, error } = useQuery({queryKey: ['transaction'], queryFn: getTransactions})
    const income = 4000
    const expense = 2300
    const upcomingExpense = 500

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                // change button to larger plus icon
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate("transactionForm")} 
                >
                    <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
            ),
        });
      }, [navigation]);

    return (
        <View style={styles.container}>
            <Header income={income} expense={expense}/>
            <ScrollView>
                <IncomeExpenseStatus income={income} expense={expense} upcomingExpense={upcomingExpense}/>
                <Body />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F8F8FF'
    },
    addBtn:{
        width: '60%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    addBtnText: {
        color: 'white',
        fontSize: 23,
        fontWeight: '600'
    }
})

export default OverviewScreen;