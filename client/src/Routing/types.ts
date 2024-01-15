import type { Transaction } from '../Common/types'
import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    signIn: undefined,
    signUp: undefined,
    tabRoutes: NavigatorScreenParams<BottomTabParamList>
    transactionForm: undefined,
    transaction: {transaction: Transaction}
}

export type BottomTabParamList = {
    overview: undefined,
    signOut: undefined
}