import type { Transaction } from '../Common/types'
import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    signIn: undefined,
    signUp: undefined,
    tabRoutes: NavigatorScreenParams<BottomTabParamList>
    transactionForm: undefined,
    transaction: {transaction: Transaction}
    transactionList: {month: number, year: number}
}

export type BottomTabParamList = {
    overview: undefined,
    signOut: undefined
    monthlyView: undefined
}