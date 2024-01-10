import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { useAuthContext } from '../Routing/hooks/useAuthContext'

import axios from 'axios'
import { API_URL } from '@env'

const LoginScreen = () => {
    const { signIn } = useAuthContext()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSignIn = async() => {
        try{
            await axios.post(
                `${API_URL}/auth/authenticate`, 
                {email, password}, 
                { 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    }
                })
        }catch(error){
            console.log(error.toJSON())
            // if(error.response){
            //     console.log(error.response.data)
            //     console.log(error.response.status)
            //     console.log(error.response.headers)
            // }else if(error.request){
            //     console.log(error.request.data)
            //     console.log(error.requeststatus)
            //     console.log(error.request.headers)
            // } else{
            //     console.log('error: ', error.message)
            // }
        }
    }

    return (
        <View>
            <Text>SIGN IN PAGE</Text>
            <TextInput
                placeholder='email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={handleSignIn} />
        </View>
    )
}

export default LoginScreen