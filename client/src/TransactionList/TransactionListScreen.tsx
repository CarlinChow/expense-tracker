import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SectionList, ActivityIndicator } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'
import { TransactionType } from '../Common/types'
import { capitalize} from '../Common/helpers/utils'
import { SectionFormattedData, groupByCategory, groupByDate } from './helpers/utils'
import Item from './Item'
import SectionHeader from './SectionHeader'
import { useQuery } from '@tanstack/react-query'
import { useGetTransactionByMonth } from '../Common/helpers/hooks'

type Props = NativeStackScreenProps<RootStackParamList, 'transactionList', 'RootStack'>

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const today = new Date()

// const data:Transaction[] = [{
//     id: 1,
//     amount: 25,
//     date: "2023-12-31",
//     description: "mcdonald's",
//     transactionType: "EXPENSE" as const,
//     category: {
//         id: 1,
//         name: "Food & Dining",
//         categoryType: "DEFAULT"
//     },
// },
// {
//     id: 2,
//     amount: 600,
//     date: "2023-12-30",
//     description: "Nike Jordans",
//     transactionType: "EXPENSE"  as const,
//     category: {
//         id: 2,
//         name: "Shopping",
//         categoryType: "DEFAULT"
//     },
// },
// {
//     id: 3,
//     amount: 100,
//     date: "2023-12-31",
//     description: "Gas",
//     transactionType: "EXPENSE" as const, 
//     category: {
//         id: 3,
//         name: "Auto & Transport",
//         categoryType: "DEFAULT"
//     },
// },
// {
//     id: 4,
//     amount: 543.20,
//     date: "2023-12-31",
//     description: "from work",
//     transactionType: "INCOME" as const,
// },
// {
//     id: 5,
//     amount: 543.20,
//     date: "2023-12-31",
//     description: "from work",
//     transactionType: "INCOME" as const,
// },
// {
//     id: 6,
//     amount: 543.20,
//     date: "2023-12-31",
//     description: "from work",
//     transactionType: "INCOME" as const,
// },{
//     id: 7,
//     amount: 543.20,
//     date: "2023-12-31",
//     description: "from work",
//     transactionType: "INCOME" as const,
// }
// ]

type Sorts = "Category" | "Date"

const TransactionListScreen:React.FC<Props> = ({navigation, route}) => {
    const { month, year } = route.params
    useEffect(() => {
        navigation.setOptions({
            headerTitle: months[month] + ((today.getFullYear() > year) ? ' ' + year.toString() : '') + ' Transactions' ,
        })
    },[navigation]) 

    const [ sortBy, setSortBy ] = useState<Sorts>("Category")
    const [ filterBy, setFilterBy ] = useState<TransactionType | null>(null)
    const { data, status } = useGetTransactionByMonth({month, year})

    const formattedData = useMemo(() => {
        if(status === "success"){
            if(sortBy === "Category"){
                return groupByCategory(data, filterBy)
            }
            return groupByDate(data, filterBy)
        }
        return []
    }, [sortBy, filterBy, data])

    const handlePressSort = () => {
        setSortBy(prev => {
            if(prev === "Category"){
                return "Date"
            }
            return "Category"
        })
    }
    const handlePressFilter = () => {
        setFilterBy(prev => {
            if(prev === null){
                return "EXPENSE"
            }
            if(prev === "EXPENSE"){
                return "INCOME"
            }
            return null
        })
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePressSort}
                >
                    <Text>Sort by: </Text>
                    <Text>{sortBy}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePressFilter}
                >
                    <Text>Filter by: </Text>
                    <Text>{filterBy ? capitalize(filterBy.toLowerCase()) : 'None'}</Text>
                </TouchableOpacity>
            </View>
			<View style={styles.listContainer}>
                {status === "success" && formattedData.length > 0 && 
                    <SectionList 
                        sections={formattedData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <Item transaction={item} navigation={navigation} sortBy={sortBy}/>}
                        renderSectionHeader={({section: {title}}) => (
                            <SectionHeader title={title} sortBy={sortBy}/>
                        )}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                    />
                }
                {status === "success" && formattedData.length === 0 && 
                    <Text style={{alignSelf: 'center'}}>No transactions found for this month</Text>
                }
                {status === 'pending' && <ActivityIndicator size='large' />}
                {status === 'error' && <Text style={{alignSelf: 'center'}}>An error occured</Text>}
			</View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F8F8FF',
        padding: 10,
    },
    buttons:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button:{
        paddingVertical: 10,
		paddingHorizontal: 20,
        backgroundColor: 'gainsboro',
        flexDirection: 'row',
        flex: 0.40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
	listContainer:{
		flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
	},
	separator:{
		height: 10,
	}
})

export default TransactionListScreen