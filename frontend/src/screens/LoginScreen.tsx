import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'

const LoginScreen: React.FC = () => {
    const { login, isAuthenticated } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            await login(email, password)
        } catch (err: any) {
            Alert.alert('Login Failed', err.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Welcome Back</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c7ed6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
        elevation: 5
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 16,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16
    },
    input: {
        width: '100%',
        backgroundColor: '#f1f3f5',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        fontSize: 16
    },
    button: {
        backgroundColor: '#1c7ed6',
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
        width: '100%'
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    forgot: {
        marginTop: 12,
        color: '#1c7ed6'
    }
})
