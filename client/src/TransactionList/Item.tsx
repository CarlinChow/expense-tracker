import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { stringToDateObject } from '../Common/helpers/utils'
import type { Transaction } from '../Common/types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    transaction: Transaction,
    navigation: NativeStackNavigationProp<RootStackParamList, 'transactionList'>
    sortBy: "Category" | "Date"
}

const Item:React.FC<Props> = ({
    transaction,
    navigation,
    sortBy
}) => {
    const { id, date, amount, description, category, transactionType } = transaction
    return (
        <TouchableHighlight
            style={styles.itemContainer}
            underlayColor={"#DCDCDC"}
            onPress={() => navigation.navigate("transaction", {transaction})}
        >
            <>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                {transactionType === "EXPENSE" ? 
                    <MaterialIcons name="money-off" size={30} color="#fd5c63" /> :
                    <MaterialIcons name="attach-money" size={30} color="#62A362" />}
                <View style={styles.detailsContainer}>
                    <View><Text style={styles.description}>{description}</Text></View>
                    {category !== undefined && sortBy !== 'Category' &&
                        <View>
                            <Text style={styles.smallerText}>{category?.name}</Text>
                        </View>
                    }
                    {sortBy !== "Date" && 
                        <View>
                            <Text style={styles.smallerText}>{stringToDateObject(date).toDateString().slice(4,10)}</Text>
                        </View>
                    }
                </View>
            </View>
            <Text style={[styles.amount, {color: transactionType === 'EXPENSE' ? '#fd5c63' : '#62A362'}]}>{transactionType === 'EXPENSE' ? '-' : ''}${amount.toFixed(2)}</Text>
            </>
        </TouchableHighlight>
    )
}

export default Item

const styles = StyleSheet.create({
    itemContainer:{
        padding: 15,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    detailsContainer:{
        display: 'flex',
        gap: 5,
    },
    description:{
        fontSize: 16,
        fontWeight: '500',
    },
    smallerText:{
        fontSize: 14,
        opacity: 0.5,
    },
    amount:{
        fontSize: 16,
        fontWeight: '600'
    }
})