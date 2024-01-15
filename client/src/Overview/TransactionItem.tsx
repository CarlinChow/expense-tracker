import { useNavigation } from '@react-navigation/native';
import { View, ViewStyle, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { formatDate } from '../Common/helpers/utils'
import type { OverviewScreenNavigationProp } from './types';
import type { Transaction } from '../Common/types'

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
                <View style={styles.detailsContainer}>
                    <Text style={styles.description}>{description}</Text>
                    {type === "EXPENSE" as const && (<Text>{category?.name}</Text> )}
                    <Text style={styles.date}>{formatDate(date)}</Text>
                    {type === "EXPENSE" as const ?
                        (<View style={styles.expenseTextContainer}>
                            <Text style={styles.expenseText}>
                                Expense
                            </Text>
                        </View>) :
                        (<View style={styles.incomeTextContainer}>
                            <Text style={styles.incomeText}>
                                Income
                            </Text>
                        </View>)}
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.amountText, {color: type === "EXPENSE" as const ? 'black' : '#6495ED'}]}>
                        {type === "EXPENSE" as const ? '-':''}${amount.toFixed(2)}
                    </Text>
                </View>
            </>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderBottomWidth: 0.4,
        borderColor: '#DCDCDC'
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    description:{
        fontSize: 16,
        fontWeight: '600'
    },
    date:{
        fontSize: 12,
        opacity: 0.6,
    },
    incomeTextContainer: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor: "#6495ED",
    },
    incomeText: {
        color: 'white',
        fontSize: 12,
    },
    expenseTextContainer: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        backgroundColor: "#fd5c63",
    },
    expenseText: {
        color: 'white',
        fontSize: 12,
    },
    amountContainer: {

    },
    amountText:{
        fontSize: 17,
        fontWeight: '400'
    }
})

export default TransactionItem