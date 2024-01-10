import React, { useReducer, useEffect, useMemo, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@tanstack/react-query';
import { login, register } from './utils'
import SplashPage from '../Common/SplashPage';
import ProtectedRoutes from './ProtectedRoutes';
import LoginScreen from '../Auth/LoginScreen';
import RegisterScreen from '../Auth/RegisterScreen';

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

const Stack = createNativeStackNavigator();

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
    const { data: loginData , isSuccess: loginIsSuccess, error: loginError, mutateAsync: loginMutate } = useMutation({mutationFn: login})
    const { data: registerData, isSuccess: registerIsSuccess, error: registerError, mutateAsync: registerMutate } = useMutation({mutationFn: register})

    useEffect(() => {
        const restoreToken = async() => {
            let token;
            try{
                token = await SecureStore.getItemAsync("token")
            }catch(e){
                console.log(e)
            }
            if(token != null){
                dispatch({type: "RESTORE_TOKEN", token: token})
            }
        }
        restoreToken()
    },[])

    const authContext =  useMemo(
        () => ({
            signIn: async (email: string , password: string) => {
                try{
                    await loginMutate({email, password})
                }catch(e){
                    console.log("Error here: " + e)
                }
                if(loginIsSuccess){
                    const token = loginData.data
                    await SecureStore.setItemAsync("token", token)
                    dispatch({ type: 'SIGN_IN', token: token});
                }else{
                    console.log("yo mama " + loginError?.message)
                }
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (email: string, password: string) => {
                await registerMutate({email, password})
                if(registerIsSuccess){
                    const token = registerData.data
                    await SecureStore.setItemAsync("token", token)
                    dispatch({ type: 'SIGN_IN', token: token});
                }else{
                    console.log(registerError?.message)
                }
            },
          }),
        []
    )

    if(state.isLoading){
        <SplashPage />
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.token == null ? (
                        <>
                            <Stack.Screen name={"Sign in"} component={LoginScreen}/>
                            <Stack.Screen name={"Sign up"} component={RegisterScreen}/>
                        </>
                    ) : (
                        <Stack.Screen name={"protectedRoutes"} component={ProtectedRoutes}/>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default Routes