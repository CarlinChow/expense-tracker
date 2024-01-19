import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Switch, TextInput, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, StatusBar} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'
import type { Category } from '../Common/types'
import { useCreateTransaction } from './helpers/hooks'
import { Toast } from 'toastify-react-native'
import CategoryPicker from '../Common/CategoryPicker'
import DateTimePicker from '@react-native-community/datetimepicker'
import LoadingModal from '../Common/LoadingModal'

type Props = NativeStackScreenProps<RootStackParamList, 'transactionForm', 'RootStack'>

const TransactionForm: React.FC<Props> = ({navigation}) => {
    const [ isExpense, setIsExpense ] = useState(true)
    const [ amount, setAmount ] = useState<string>("")
    const [ date, setDate ] = useState<Date>(new Date())
    const [ description, setDescription ] = useState<string>("")
    const [ category, setCategory ] = useState<Category | undefined>()
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ loadingModalVisible, setLoadingModalVisible ] = useState(false)
    const createTransaction = useCreateTransaction()
    const descriptTextInput = useRef<TextInput>(null)

    const handleOnPressCreate = () => {
        setLoadingModalVisible(true)
        createTransaction.mutate({
            amount: parseFloat(amount),
            date,
            description,
            category,
            transactionType: isExpense ? 'EXPENSE' : 'INCOME',
        },{
            onSuccess: () => {
                Toast.success("Transaction created!"),
                navigation.goBack()
            },
            onError: (error) => Toast.error(`Something went wrong: ${error.message}`, 'top'),
            onSettled: () => setLoadingModalVisible(false),
        })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.screen}>
                <StatusBar barStyle='light-content'/>
                <View style={[styles.typeContainer, styles.boxShadow]}>
                    <View style={styles.typeTextContainer}>
                        <Text style={styles.inputHeader}>Type </Text>
                        <Text style={[styles.inputText, {
                            color: isExpense ? '#fd5c63' : '#6495ED',
                            fontWeight: '600'
                        }]}>{isExpense ? 'Expense' : 'Income'}</Text>
                    </View>
                    <Switch 
                        value={isExpense}
                        onValueChange={() => setIsExpense(prev => !prev)}
                        trackColor={{ true: '#fd5c63', false: '#6495ED' }}
                        ios_backgroundColor="#6495ED"
                    />
                </View>
                <View style={[styles.amountContainer, styles.boxShadow]}>
                    <Text style={styles.inputHeader}>Amount($)</Text>
                    <TextInput 
                        style={[styles.inputText, {fontSize: 25}]}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder='Enter an amount'
                        keyboardType='numeric'
                        maxLength={8}
                    />
                </View>
                <TouchableHighlight 
                    style={[styles.descriptionContainer, styles.boxShadow]}
                    onPress={() => descriptTextInput.current?.focus()}
                    underlayColor={"#DCDCDC"}
                >
                    <>
                    <Text style={styles.inputHeader}>Description</Text>
                    <TextInput 
                        style={styles.inputText}
                        ref={descriptTextInput}
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Enter a description'
                        maxLength={50}
                        multiline={true}
                    />
                    </>
                </TouchableHighlight>
                <View style={[styles.dateContainer, styles.boxShadow]}>
                    <Text style={[styles.inputHeader, {marginLeft: 15}]}>Date</Text>
                    <DateTimePicker 
                        value={date}
                        mode='date'
                        onChange={(e, newDate) => newDate ? setDate(newDate) : void(0)}
                        accentColor={isExpense ? '#fd5c63' : '#6495ED'}
                    />
                </View>
                {isExpense && 
                    <TouchableHighlight
                        style={[styles.categoryContainer, styles.boxShadow]}
                        onPress={()=>setModalVisible(true)}
                        underlayColor={"#DCDCDC"}
                    >
                        <>
                            <Text style={styles.inputHeader}>Category</Text>
                            <Text style={
                                [styles.inputText, {
                                    opacity: category === undefined ? 0.2 : 1
                                }]
                            }>
                                {category === undefined ? 'No category selected' : category.name}
                            </Text>
                        </>
                    </TouchableHighlight>
                }
                <TouchableHighlight
                    style={[styles.btnContainer, styles.boxShadow]}
                    onPress={handleOnPressCreate} 
                    underlayColor={"#DCDCDC"}
                >
                    <Text style={styles.btnText}>Create</Text>
                </TouchableHighlight>
                {isExpense &&
                    <CategoryPicker 
                        isVisible={modalVisible}
                        closeModal={()=>setModalVisible(false)}
                        category={category}
                        setCategory={setCategory}
                    />
                }
                <LoadingModal 
                    isVisible={loadingModalVisible}
                    loadingMessage='Creating Transaction...'
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F8F8FF',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        gap: 15,
    },
    inputHeader: {
        fontSize: 14,
    },
    inputText: {
        fontSize: 18,
    },
    typeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    },
    typeTextContainer:{
        display: 'flex',
        gap: 10,
    },
    amountContainer: {
        padding: 15, 
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        gap: 10,
    },
    dateContainer: {
        paddingVertical: 15, 
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
    },
    descriptionContainer:{
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
    },
    categoryContainer: {
        padding: 15, 
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
    },
    btnContainer:{
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10
    },
    btnText:{
        color: '#6495ED',
        fontWeight: '600',
        fontSize: 16,
    },
    boxShadow: {
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    }
})

export default TransactionForm