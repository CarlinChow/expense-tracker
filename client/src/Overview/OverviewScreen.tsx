import React, { useEffect, useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Header from './Header'
import Body from './Body'
import IncomeExpenseStatus from './IncomeExpenseStatus';
import type { OverviewScreenProps } from './types';
import { AntDesign } from '@expo/vector-icons';
import { useGetTransactionByMonth } from '../Common/helpers/hooks';
import LoadingModal from '../Common/LoadingModal';

const today = new Date()
const month = today.getMonth()
const year = today.getFullYear()

const OverviewScreen:React.FC<OverviewScreenProps> = ({ navigation }) => {
    const { data, status } = useGetTransactionByMonth({month, year})

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => navigation.navigate("transactionForm")} 
                >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const income = useMemo(():number => {
        if(status === 'success'){
            return data.filter(trans => trans.transactionType === 'INCOME')
                        .reduce((acc, b) => acc + b.amount, 0)
        }
        return 0
    },[data])

    const expense = useMemo(():number => {
        if(status === 'success'){
            return data.filter(trans => trans.transactionType === 'EXPENSE')
                        .reduce((acc, b) => acc + b.amount, 0)
        }
        return 0
    },[data])

    return (
        <View style={styles.container}>
            {status === 'success' && <>
                <Header income={income} expense={expense}/>
                <ScrollView>
                    <IncomeExpenseStatus income={income} expense={expense}/>
                    <Body />
                </ScrollView>
            </>}
            {status === 'pending' && <ActivityIndicator size='large'/>}
            {status === 'error' && <Text>Something went wrong</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F8F8FF',
        justifyContent: 'center'
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