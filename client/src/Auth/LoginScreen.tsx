import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { useAuthContext } from '../Routing/helpers/useAuthContext'

const LoginScreen = () => {
    const { signIn } = useAuthContext()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSignIn = async() => {
        try{
            await signIn(email, password)
        }catch(e){
            // handle error here, perhaps show a notifciation
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
            <Button title="Sign in" onPress={handleSignIn}/>
        </View>
    )
}

export default LoginScreen