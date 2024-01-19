import { useNavigation } from '@react-navigation/native';
import { View, ViewStyle, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { formatDate, stringToDateObject } from '../Common/helpers/utils'
import type { OverviewScreenNavigationProp } from './types';
import type { Transaction } from '../Common/types'
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    transaction: Transaction,
    style?: ViewStyle
}

const TransactionItem: React.FC<Props> = ({transaction, style}) => {
    const navigation = useNavigation<OverviewScreenNavigationProp>();
    const {
        amount,
        date,
        description,
        transactionType: type,
        category,
    } = transaction
    return(
        <TouchableHighlight
            underlayColor={"#DCDCDC"}
            style={[styles.item, style]}
            onPress={() => {
                navigation.navigate('transaction', {
                    transaction: transaction
                })
            }}
        >
            <>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    {type === "EXPENSE" ? 
                        <MaterialIcons name="money-off" size={30} color="#fd5c63" /> :
                        <MaterialIcons name="attach-money" size={30} color="#62A362" />
                    }
                    <View style={styles.detailsContainer}>
                    <Text style={styles.description}>{description}</Text>
                    {type === "EXPENSE" as const && (<Text style={styles.categoryText}>{category?.name}</Text> )}
                    <Text style={styles.date}>{stringToDateObject(date).toDateString().slice(4,10)}</Text>
                </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.amountText, {color: type === 'EXPENSE' ? '#fd5c63' : '#62A362'}]}>
                        {type === "EXPENSE" as const ? '-':''}${amount.toFixed(2)}
                    </Text>
                </View>
            </>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 5,
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    description:{
        fontSize: 15,
        fontWeight: '500'
    },
    date:{
        fontSize: 12,
        opacity: 0.6,
    },
    categoryText:{
        fontSize: 13,
    },
    amountContainer: {

    },
    amountText:{
        fontSize: 15,
        fontWeight: '500'
    }
})

export default TransactionItem