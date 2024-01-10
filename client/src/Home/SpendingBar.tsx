import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ProgressBar from '../Common/ProgressBar'

type Props = {
    income: number,
    expense: number,
}

const SpendingBar: React.FC<Props> = ({
    income, 
    expense
}) => {
    const percentage = ((expense / income) * 100)
    if(income == null || expense == null){
        return(<></>)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                <Text style={styles.boldedText}>${expense}</Text> of ${income} spent
            </Text>
            <ProgressBar
                percentage={percentage} 
                warningColor={"#FFDB58"}
                outerBarColor={'#32906E'}
                innerBarColor={'#84CFB4'}
                height={12}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    text:{
        fontSize: 15,
        color: 'white',
    },
    boldedText:{
        fontWeight: "bold",
    }
})

export default SpendingBar