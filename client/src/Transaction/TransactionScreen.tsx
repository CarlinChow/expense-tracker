import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Alert, StatusBar, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { capitalize, stringToDateObject } from '../Common/helpers/utils'
import Header from './Header'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Toast } from 'toastify-react-native'
import CategoryPicker from '../Common/CategoryPicker'
import type { Category } from '../Common/types'
import { useDeleteTransaction, useUpdateTransaction } from './helpers/hooks'

type Props = NativeStackScreenProps<RootStackParamList, 'transaction', 'rootStack'>

const TransactionScreen:React.FC<Props> = ({route, navigation}) => {
    const { transaction: { id, amount, date, description, transactionType, category } } = route.params
    const [ amountState, setAmountState ] = useState(amount.toFixed(2))
    const [ dateState, setDateState ] = useState<Date>(stringToDateObject(date))
    const [ descriptionState, setDescriptionState ] = useState(description)
    const [ categoryState, setCategoryState ] = useState<Category | undefined>(category)
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ editState, setEditState ] = useState(false)
    const deleteTransaction = useDeleteTransaction()
    const updateTransaction = useUpdateTransaction()
    const insets = useSafeAreaInsets()
    const descriptionInputRef = useRef<TextInput>(null)

    const createDeleteAlert = () => Alert.alert( "Delete Transaction", "Are you sure you want to delete this transaction?",
        [
            { text: 'Never mind'}, 
            { 
                text: 'Delete', 
                style: 'destructive', 
                onPress: () => {
                    deleteTransaction.mutate(id, {
                        onSuccess: () => navigation.goBack(),
                        onError: (error) => Toast.error(`Something went wrong: ${error.message}`, 'top') 
                    })
                }
            }
    ])

    const createDiscardAlert = () => Alert.alert("Discard Changes", "Are you sure you want to discard these changes you've made?",
        [{ text: 'Never mind' }, { text: 'Discard changes', style: 'destructive', onPress: () => {
            setEditState(false)
            setAmountState(amount.toFixed(2))
            setDateState(stringToDateObject(date))
            setDescriptionState(description)
            setCategoryState(category)
        }}]
    )
    
    const handleSaveChanges = () => {
        updateTransaction.mutate({
            id: id,
            amount: parseFloat(amountState),
            description: descriptionState,
            date: dateState,
            category: categoryState,
            transactionType: transactionType,
        }, { 
            onSuccess: () => {           
                Toast.success('Transaction sucessfully updated!',  'top')
                setEditState(false)
            },
            onError: (error) => Toast.error(`Something went wrong: ${error.message}`, 'top')
        })
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.screen, {
                // required b/c using custom header
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }]}>
                <StatusBar barStyle={"dark-content"}/>
                <Header navigation={navigation} editState={editState} setEditState={setEditState} createDiscardAlert={createDiscardAlert}/>
                <View style={styles.amountContainer}>
                    <Text style={{fontSize: 60, fontWeight: '600',}}>$</Text>
                    <TextInput 
                        editable={editState}
                        style={styles.amountText}
                        value={amountState}
                        onChangeText={setAmountState}
                        keyboardType='numeric'
                        maxLength={7}
                    /> 
                </View>
                <View style={styles.dateContainer}>
                    <DateTimePicker 
                        disabled={!editState}
                        value={dateState}
                        mode='date'
                        onChange={(e, newDate) => newDate ? setDateState(newDate) : void(0)}
                    />
                </View>
                <View style={styles.typeContainer}>
                    <Text style={{fontWeight: '600', fontSize: 17}}>
                        Transaction Type: 
                    </Text>
                    <Text style={styles.typeText}>
                        {capitalize(transactionType.toLowerCase())}
                    </Text>
                </View>
                {transactionType === "EXPENSE" as const &&
                    <TouchableHighlight 
                        style={styles.categoryContainer}
                        underlayColor={"#DCDCDC"}
                        onPress={()=>setModalVisible(true)} 
                        disabled={!editState}
                    >
                        <>
                        <Text style={{
                            fontWeight: '600', 
                            fontSize: 17,
                            color: modalVisible ? "#6495ED" : "black"
                        }}>
                            Category: 
                        </Text>
                        <Text style={[styles.typeText, {
                            color: modalVisible ? "#6495ED" : "black"
                        }]}>
                            {categoryState?.name}
                        </Text>
                        </>
                    </TouchableHighlight>
                }
                <TouchableHighlight 
                    style={styles.descriptionContainer}
                    underlayColor={"#DCDCDC"}
                    onPress={()=> descriptionInputRef.current?.focus()}
                    disabled={!editState}
                >
                    <>
                    <Text style={{fontWeight: '600', fontSize: 17}}>
                        Description: 
                    </Text>
                    <TextInput 
                        ref={descriptionInputRef}
                        placeholder='Enter a description here'
                        editable={editState}
                        value={descriptionState}
                        onChangeText={setDescriptionState}
                        style={styles.descriptionText}
                        multiline={true}
                        maxLength={50}
                    />      
                    </>    
                </TouchableHighlight>
                <View style={styles.bottomBtns}>
                    {editState ?
                        <TouchableHighlight
                            style={styles.btn}
                            underlayColor={"#DCDCDC"}
                            onPress={handleSaveChanges}
                        >
                            {updateTransaction.isPending ?
                                <ActivityIndicator size='small' /> 
                            :
                                <Text style={[styles.btnText, {color: '#6495ED'}]}>Save Changes</Text>
                            }
                        </TouchableHighlight>
                    :
                        <TouchableHighlight
                            style={styles.btn}
                            underlayColor={"#DCDCDC"}
                            onPress={createDeleteAlert}
                        >
                            {deleteTransaction.isPending ?     
                                <ActivityIndicator size='small' /> 
                            :
                                <Text style={[styles.btnText, {color:'#fd5c63'}]}>Delete</Text>
                            }
                        </TouchableHighlight>
                    }

                </View> 
                {categoryState != undefined && 
                    <CategoryPicker 
                        isVisible={modalVisible}
                        closeModal={()=>setModalVisible(false)}
                        category={categoryState}
                        setCategory={setCategoryState}
                    />
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F8F8FF',
        flex: 1,
    },
    amountContainer:{
        marginVertical: 20,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 60,
        fontWeight: '600',
    },
    dateContainer:{
        alignSelf: 'center',
    },
    date:{
        fontSize: 20,
    },
    typeContainer:{
        alignSelf: 'stretch',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 15,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    typeText: {
        fontSize: 17,
        fontWeight: '500',
    },
    descriptionContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        display: 'flex',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        gap: 5,
    },
    descriptionText: {
        fontSize: 15,
        fontFamily: 'Verdana'
    },
    categoryContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        gap: 5,
    },
    bottomBtns:{
        display: 'flex',
        alignSelf: 'stretch',
        paddingHorizontal: 15,
        marginTop: 80,
    },
    btn: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600'
    }
})

export default TransactionScreen