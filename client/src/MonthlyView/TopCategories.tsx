import React from 'react'
import { View, Text, StyleSheet, FlatList, ColorValue, TouchableHighlight, TouchableOpacity } from 'react-native'
import { PieChartInfo } from './types'
import { useNavigation } from '@react-navigation/core'
import type { MonthlyViewNavigationProp } from './types'

type Props = {
    data: PieChartInfo[],
    spent: number,
    month: number,
    year: number,
}

interface ItemProps extends PieChartInfo {
    spent: number
}

const Item:React.FC<ItemProps> = ({
    color,
    amount,
    category,
    spent,
}) => {
    const percentage = (amount / spent) * 100
    return (
        <View style={styles.itemContainer}>
            <View style={styles.categoryContainer}>
                <View style={[styles.coloredCircle, {backgroundColor: color}]}></View>
                <View>
                    <Text style={[styles.categoryName, {color: color, fontWeight: '700'}]}>{category.name}</Text>
                    <Text style={[styles.percentage, {color: color, fontWeight: '500'}]}>{percentage.toFixed(2) + '%'}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.amount}>${amount.toFixed(2)}</Text>
            </View>
        </View>
    )
}

const TopCategories:React.FC<Props> = ({
    data, 
    spent, 
    month, 
    year
}) => {
    const sortedData = data.sort((a,b) => b.amount - a.amount)
    const navigation = useNavigation<MonthlyViewNavigationProp>()

    return (
        <View style={styles.container}>
            {data.length > 0 && <>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Top Categories
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('transactionList', {month: month, year: year})}
                >
                    <Text style={styles.btn}>See Transactions</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={sortedData}
                renderItem={({item}) => <Item color={item.color} amount={item.amount} category={item.category} spent={spent} />}
                keyExtractor={item => item.category.name}
                showsVerticalScrollIndicator={false}
            />
            </>}
            {data.length === 0 &&
                <TouchableOpacity
                    onPress={() => navigation.navigate('transactionList', {month: month, year: year})}
                    style={{alignSelf: 'flex-end', paddingTop: 5}}
                >
                    <Text style={styles.btn}>See Transactions</Text>
                </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
        gap: 15,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title:{
        fontSize: 25,
        fontWeight: '700'
    },
    btn:{
        fontSize: 16,
        color: '#6495ED',
        fontWeight: '700',
    },
    itemContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    coloredCircle:{
        width: 20,
        height: 20,
        borderRadius: 25,
    },
    categoryName:{
        fontSize: 18,
        fontWeight: '600'
    },
    percentage: {
        
    },
    amount:{
        fontSize: 17,
        opacity: 0.5,
        fontWeight: '600',
    }
})

export default TopCategories