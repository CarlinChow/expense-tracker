import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modal'
import type { Category } from './types'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from './helpers/utils'

type Props = {
    isVisible: boolean,
    closeModal: Function,
    category?: Category,
    setCategory: Function,
}

const CategoryPicker:React.FC<Props> = ({
    isVisible,
    closeModal,
    category,
    setCategory,
}) => {
    const { isPending, isError, isSuccess, data, error } = useQuery({ 
        queryKey: ['category'],  
        queryFn: getCategories,
    })

    return (
        <Modal
            style={{ margin: 0 }}
            isVisible={isVisible}
            onBackdropPress={() => closeModal()}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}
            animationOutTiming={500}
        >   
            <View 
                style={styles.container}
            >
                {isPending && <ActivityIndicator size={'large'}/>}
                {isError && <Text>{error.message}</Text>}
                {isSuccess &&
                    <>
                    <Picker
                        style={styles.picker}
                        selectedValue={category?.name}
                        onValueChange={(_, itemIndex) => setCategory(data[itemIndex])}
                    >
                        {data?.map((category) => 
                            <Picker.Item label={category.name} value={category.name} key={category.id}/>
                        )}
                    </Picker>
                    <TouchableHighlight
                        onPress={()=>closeModal()}
                        underlayColor={"#DCDCDC"}
                        style={styles.doneButton}
                    >
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableHighlight>
                    </>
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '40%', 
        marginTop: 'auto', 
        backgroundColor: '#F8F8FF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    picker: {
        width: '100%'
    },
    doneButton:{    
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    doneButtonText:{
        fontSize: 18,
        fontWeight: '500',
        color: '#6495ED',
    }
})

export default CategoryPicker