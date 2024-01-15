import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SpendingBar from './SpendingBar';
import { daysRemainingInMonth } from './helpers/utils';

export type Props = {
    income: number,
    expense: number,
}

const Header: React.FC<Props> = ({
    income,
    expense
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <View style={styles.cashLeftContainer}>
                <Text style={styles.cashLeft}>
                    ${(income - expense).toFixed(0)}
                </Text>
                <Text style={styles.left}>
                    Left
                </Text>
            </View>
            <View style={styles.daysLeftContainer}>
                <Text style={[styles.daysLeftText, {fontSize: 20, opacity: 1}]}>{daysRemainingInMonth()}</Text>
                <Text style={styles.daysLeftText}>days left</Text>
            </View>
        </View>
        <SpendingBar income={income} expense={expense}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: '#6495ED',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: 'white',
        flexDirection: 'column',
        gap: 10,
    },
    topContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    cashLeftContainer: {
        flex: 0.75,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        gap: 10,
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    cashLeft:{
        fontSize: 50,
        color: 'white',
        fontWeight: '700',
    },
    left:{
        fontSize: 12,
        borderRadius: 5,
        color: 'white',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'white'
    },
    daysLeftContainer: {
        flex: 0.25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderLeftWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 15,
    },
    daysLeftText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
        opacity: 0.7
    }
})

export default Header