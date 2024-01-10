import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SpendingBar from './SpendingBar';

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
        <View style={styles.cashLeftContainer}>
            <Text style={styles.cashLeft}>
                ${(income - expense).toFixed(0)}
            </Text>
            <Text style={styles.left}>
                Left
            </Text>
        </View>
        <SpendingBar income={income} expense={expense}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        paddingVertical: 30,
        backgroundColor: '#3EB489',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: 'white',
        flexDirection: 'column',
        gap: 5,
    },
    cashLeftContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    cashLeft:{
        fontSize: 50,
        color: 'white',
        paddingHorizontal: 10,
        fontWeight: '700',
    },
    left:{
        fontSize: 13,
        borderRadius: 5,
        color: 'white',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: 'white',
    }
})

export default Header