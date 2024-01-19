import React, { useReducer, useEffect, useMemo, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@tanstack/react-query';
import { login, register } from './helpers/utils'
import SplashPage from '../Common/SplashPage';
import TabRoutes from './TabRoutes';
import SignInScreen from '../Auth/SignInScreen';
import SignUpScreen from '../Auth/SignUpScreen';
import TransactionFormScreen from '../TransactionForm/TransactionFormScreen';
import axios from 'axios'
import TransactionScreen from '../Transaction/TransactionScreen';
import TransactionListScreen from '../TransactionList/TransactionListScreen';
import type { RootStackParamList } from './types';

type AuthContext = {
    signIn: Function,
    signOut: Function,
    signUp: Function,
}

type UserState = {
    isLoading: boolean,
    isSignOut: boolean,
    token: string | null
}

type ActionObj = {
    type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT"
    isLoading?: boolean,
    isSignOut?: boolean,
    token?: string
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthContext = createContext<AuthContext | null>(null);

const userStateReducer = (prevState: UserState, action: ActionObj): UserState => {
    switch(action.type){
        case "RESTORE_TOKEN":{}
            return{
                ...prevState,
                token: action.token != null ? action.token : null,
                isLoading: false
            }
        case "SIGN_IN": 
            return{
                ...prevState,
                isSignOut: false,
                token: action.token != null ? action.token : null
            }
        case "SIGN_OUT": 
            return{
                ...prevState,
                isSignOut: true,
                token: null,
            }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const Routes = () => {
    const [state, dispatch] = useReducer(userStateReducer, { isLoading: true, isSignOut: false, token: null})
    const { reset, mutate: loginMutate } = useMutation({
        mutationFn: login,
        onSuccess: async({data}) => {
            const { token } = data
            await SecureStore.setItemAsync("token", token)
            axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
            dispatch({ type: 'SIGN_IN', token: token})
        },
        onError: () => {
            // display error toast
        }
    })
    const { mutate: registerMutate } = useMutation({
        mutationFn: register,
        onSuccess: async({data}) => {
            const { token } = data
            await SecureStore.setItemAsync("token", token)
            axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
            dispatch({ type: 'SIGN_IN', token: token})
        }
    })

    useEffect(() => {
        const restoreToken = async() => {
            let token = await SecureStore.getItemAsync("token")
            if(token != null){
                dispatch({type: "RESTORE_TOKEN", token: token})
            }
        }
        restoreToken()
        axios.defaults.headers.common["Content-Type"] = "application/json"
        axios.defaults.headers.common["Accept"] = "application/json"
    },[])

    const authContext = useMemo(() => ({
            signIn: (email: string , password: string) => {
                loginMutate({email, password})

            },
            signOut: async() => {
                await SecureStore.deleteItemAsync("token")
                delete axios.defaults.headers.common["Authorization"];
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp:  (email: string, password: string) => {
                registerMutate({email, password})
            }
        }), []
    )

    if(state.isLoading){
        <SplashPage />
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.token == null ? (
                        // auth screens
                        <Stack.Group>
                            <Stack.Screen 
                                name={"signIn"} 
                                component={SignInScreen}
                                options = {{
                                    animationTypeForReplace: "pop",
                                    headerShown: false,
                                }}   
                            />
                            <Stack.Screen 
                                name={"signUp"} 
                                component={SignUpScreen}
                                options = {{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Group>
                    ) : (
                        // protected screens
                        <Stack.Group>
                            <Stack.Screen 
                                name="tabRoutes"
                                component={TabRoutes} 
                                options={{
                                    headerShown: false,
                                    animationTypeForReplace: "push"
                                }}   
                            />
                            <Stack.Screen 
                                name="transactionForm" 
                                component={TransactionFormScreen}
                                options={{
                                    presentation: 'modal',
                                    headerTitle: 'Create Transaction',
                                    headerStyle:{
                                        backgroundColor: '#F8F8FF'
                                    },
                                    headerShadowVisible: false,
                                }}
                            />
                            <Stack.Screen 
                                name="transaction" 
                                component={TransactionScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="transactionList"
                                component={TransactionListScreen}
                                options={{
                                    headerStyle:{
                                        backgroundColor: '#F8F8FF'
                                    },
                                    headerShadowVisible: false,
                                }}
                            />
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default Routes