import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { useAuthContext } from '../Routing/helpers/useAuthContext'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'

type Props = NativeStackScreenProps<RootStackParamList, 'signUp', 'rootStack'>

const SignUpScreen:React.FC<Props> = ({ navigation }) => {
    const { signUp } = useAuthContext()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordAgain, setPasswordAgain ] = useState("")

    const handleSignUp = () => {
        if(password !== passwordAgain){
            // throw toast error
            console.log("Passwords need to match")
        }else{
            signUp(email.toLowerCase(), password)
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>Expense Tracker</Text>
                <Text style={styles.description}>Sign up now to start tracking your expenses!</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    value={passwordAgain}
                    onChangeText={setPasswordAgain}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.signUpButton} 
                    onPress={handleSignUp}
                >
                    <Text 
                        style={styles.signUpButtonText}
                    >
                        Sign up
                    </Text>
                </TouchableOpacity>
                <Text>Have an account?
                    <Text
                        onPress={() => {navigation.navigate("signIn")}}
                        style={styles.link}
                    >
                       {" Sign in here"}
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 0.8,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        width: "100%"
    },
    title: {
        fontSize: 35,
        fontWeight: '700',
    },
    description: {
        marginBottom: 10,
        fontSize: 15,
    },
    input: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 17,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
    },
    signUpButton: {
        padding: 10,
        backgroundColor: "#6495ED",
        width: "100%",
        borderRadius: 5,
        marginVertical: 20,
    },
    signUpButtonText: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
    link: {
        color: "#6495ED",
        fontWeight: '500',
    }
})

export default SignUpScreen