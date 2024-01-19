import React, { useState, useRef } from 'react'
import { View, Text, TextInput,  StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { useAuthContext } from '../Routing/helpers/useAuthContext'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../Routing/types'

type Props = NativeStackScreenProps<RootStackParamList, 'signIn', 'rootStack'>

const SignInScreen:React.FC<Props> = ({ navigation }) => {
    const { signIn } = useAuthContext()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>Expense Tracker</Text>
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
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => signIn(email.toLowerCase(), password)}
                >
                        <Text style={styles.signInButtonText}>
                            Sign in
                        </Text>
                </TouchableOpacity>
                <Text>Don't have an account?  
                    <Text
                        style={styles.link}
                        onPress={() => {navigation.navigate("signUp")}}
                    >
                       {" Sign up here"}
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
        paddingBottom: 20,
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
    signInButton: {
        padding: 10,
        backgroundColor: "#6495ED",
        width: "100%",
        borderRadius: 5,
        marginVertical: 20,
    },
    signInButtonText: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
    link: {
        color: "#6495ED",
        fontWeight: '500',
    }
})

export default SignInScreen