import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text,  } from 'react-native-animatable'
import PieChart from 'react-native-pie-chart'
import type { PieChartInfo } from './types'
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    data: PieChartInfo[], 
    spent: number,
    income: number,
    handleNextMonth: Function,
    handlePrevMonth: Function,
}

const CategoryPieChart:React.FC<Props> = ({
    data,
    spent,
    income,
    handleNextMonth,
    handlePrevMonth,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handlePrevMonth()}
            >
                <MaterialIcons name="navigate-before" size={50} color="white" />
            </TouchableOpacity>
            {data.length > 0 &&
                <View style={styles.pieChart}>
                    <PieChart
                        widthAndHeight={270}
                        series={data.map(item => item.amount)}
                        sliceColor={data.map(item => item.color)}
                        coverRadius={0.65}
                        coverFill={'#6495ED'}
                    />
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLg}>${spent.toFixed(0)}</Text>    
                        <Text style={styles.amountSm}>of ${income.toFixed(0)}</Text>  
                    </View>
                </View>
            }
            {data.length === 0 && 
                <View style={
                    {width: 270, height: 270, display: 'flex', alignItems: 'center', justifyContent: 'center'}
                }>
                    <Text style={{color: 'white', fontSize: 14}}>You have no expenses for this month</Text>
                </View>}
            <TouchableOpacity
                onPress={() => handleNextMonth()}
            >
                <MaterialIcons name="navigate-next" size={50} color="white" />
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#6495ED',
        paddingVertical: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    pieChart: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    amountContainer: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    amountLg: {
        fontSize: 40,
        color: 'white',
        fontWeight: '700',
    },
    amountSm:{
        color: 'white',
        fontWeight: '400',
        fontSize: 12,
    },
    legend:{
        display: 'flex',
        flexWrap: 'wrap'
    }
})

export default CategoryPieChart