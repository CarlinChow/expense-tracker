import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import type { MonthlyViewScreenProps } from './types'
import CategoryPieChart from './CategoryPieChart'
import TopCategories from './TopCategories'
import { AntDesign } from '@expo/vector-icons';
import { calculateChartData } from './helpers/utils'
import { useQuery } from '@tanstack/react-query'
import { getTransactionsByMonth } from '../Common/helpers/utils'
import LoadingModal from '../Common/LoadingModal'
import { useGetTransactionByMonth } from '../Common/helpers/hooks'

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const sliceColor = ['#BEADFA','#F9B572','#FFC5C5','#756AB6','#86B6F6', '#3887BE', '#38419D', '#86A789', '#92C7CF']
const today = new Date()
const month = today.getMonth()
const year = today.getFullYear()

// const categoryInfo= [{
//     amount: 850,
//     category: {
//         categoryType: "DEFAULT" as const,
//         name: "auto & transport",
//         id: 3
//     },
// },{
//     amount: 250,
//     category: {
//         categoryType: "DEFAULT" as const,
//         name: "bills & utility",
//         id: 4
//     },
// },{
//     amount: 200,
//     category: {
//         categoryType: "DEFAULT" as const,
//         name: "food & dining",
//         id: 2
//     }
// }, {
//     amount: 150,
//     category: {
//         categoryType: "CUSTOM" as const,
//         name: "pet",
//         id: 5
//     }
// },{
//     amount: 250,
//     category: {
//         categoryType: "DEFAULT" as const,
//         name: "shopping",
//         id: 1
//     }
// }]

const MonthlyViewScreen:React.FC<MonthlyViewScreenProps> = ({navigation}) => {
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
        })
    },[])

    const [ date, setDate ] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1))
    const { data, status } = useGetTransactionByMonth({
        month: date.getMonth(),
        year: date.getFullYear()
    })

    const categoryInfo = useMemo(() => {
        if(status === 'success'){
            return calculateChartData(data).map((info, idx) => ({...info, color: sliceColor[idx]}))
        }
        return []
    },[data])

    const totalSpending = useMemo(() => (
        categoryInfo.reduce((acc, item) => acc + item.amount, 0)
    ),[categoryInfo])

    const totalIncome = useMemo(() => {
        if(status === 'success'){
            return data.filter(item => item.transactionType === 'INCOME').reduce((acc, i) => acc + i.amount, 0)
        }
        return 0
    },[data])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: months[date.getMonth()] + ((today.getFullYear() > date.getFullYear()) ? ' ' + date.getFullYear().toString() : '') + ' Spending' ,
        })
    },[navigation, date])

    const handleNextBtn = () => {
        setDate((prev) => {
            if(prev.getMonth() === 11){
                return new Date(prev.getFullYear() + 1, 0, 1)
            }
            return new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        })
    }

    const handlePrevBtn = () => {
        setDate((prev) => {
            if(prev.getMonth() === 0){
                return new Date(prev.getFullYear() - 1, 11, 1)
            }
            return new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        })
    }

    if(status === 'pending'){
        <LoadingModal isVisible={true} loadingMessage='loading transactions...'/>
    }
    return (
        <View style={styles.screen}>
            {status === 'pending' && <ActivityIndicator size='large' style={styles.loadingIcon}/>}
            {status === 'success' && <> 
                <CategoryPieChart
                    spent={totalSpending}
                    income={totalIncome}
                    data={categoryInfo}
                    handleNextMonth={handleNextBtn}
                    handlePrevMonth={handlePrevBtn}
                />
                <TopCategories 
                    spent={totalSpending} 
                    data={categoryInfo}
                    month={date.getMonth()}
                    year={date.getFullYear()} 
                />
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
    loadingIcon:{
        alignSelf: 'center'
    },
    header: {
        backgroundColor: '#6495ED',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    amountContainer: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    amountLg: {
        fontSize: 30,
        color: 'white',
        fontWeight: '700',
    },
    amountSm:{
        color: 'white',
        fontWeight: '700',
    }
})

export default MonthlyViewScreen