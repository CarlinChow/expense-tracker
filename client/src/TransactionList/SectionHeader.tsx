import { StyleSheet, Text, View } from 'react-native'
import { stringToDateObject } from '../Common/helpers/utils'
import React from 'react'

type Props = {
    title: string,
    sortBy: "Category" | "Date"
}

const SectionHeader:React.FC<Props> = ({title, sortBy}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                {sortBy === 'Date' ? stringToDateObject(title).toDateString().slice(4,10): title}
            </Text>
        </View>
    )
}

export default SectionHeader

const styles = StyleSheet.create({
    header:{
        paddingVertical: 10,
    },
    title:{
        fontSize: 20,
        fontWeight: '600'
    }
})