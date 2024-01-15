import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ProgressBar from '../Common/ProgressBar'

type Props = {
    income: number,
    expense: number,
    upcomingExpense?: number,
}

const SpendingBar: React.FC<Props> = ({
    income, 
    expense,
}) => {
    const percentage = ((expense / income) * 100)
    return (
        <View style={styles.container}>
            <ProgressBar
                barOne={{
                    percentage: percentage,
                    color: '#B9D9EB'
                }} 
                outerBarColor={'#5072A7'}
                height={12}
            /> 
            <Text style={styles.text}>
                <Text style={styles.boldedText}>${expense}</Text> of ${income} spent this month
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    text:{
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 5,
    },
    boldedText:{
        fontWeight: "bold",
    }
})

export default SpendingBar