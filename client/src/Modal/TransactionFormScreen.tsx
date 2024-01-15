import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'

type TransactionType = 
    |"EXPENSE" 
    |"INCOME"

type Props = NativeStackScreenProps<RootStackParamList, 'transactionForm', 'RootStack'>

const TransactionForm: React.FC<Props> = ({navigation}) => {
    const [ transactionType, setTransaction ] = useState<TransactionType>("EXPENSE")
    const [ amount, setAmount ] = useState<number>(0.00)
    const [ date, setDate ] = useState<number>(0.00)
    const [ description, setDescription ] = useState<string>("")
    // const [ category, setCategory ] = useState<object>()
    
    return (
        <View>
            <Text>TRANSACTION FORM</Text>
        </View>
    )
}

export default TransactionForm