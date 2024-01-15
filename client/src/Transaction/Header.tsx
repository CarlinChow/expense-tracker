import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Routing/types';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'transaction'>
    editState: boolean,
    setEditState: Function,
}

const Header:React.FC<Props> = ({navigation, editState, setEditState}) => {
    return (
        <View style={styles.header}>
            {/* change to back icon later*/}
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={styles.backBtnContainer}
            >
                <Text style={styles.backBtnText}>Back</Text> 
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setEditState(!editState)}
                style={styles.editBtnContainer}
            >
                <Text style={[styles.editBtnText, {
                    color: editState === true ? '#fd5c63': '#6495ED'
                }]}>
                    {editState === true ? 'Discard' : 'Edit'}
                </Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    backBtnContainer: {
        paddingHorizontal: 15,
    },
    backBtnText: {
        fontSize: 18,
        fontWeight:'600',
        color: '#6495ED'
    },
    editBtnContainer: {
        paddingHorizontal: 15,
    },
    editBtnText: {
        fontSize: 18,
        fontWeight:'600',
        color: '#6495ED'
    },
})

export default Header