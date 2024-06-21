import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        console.log(email, password);
        const userData = {
            email: email,
            password,
        };

        axios.post('http://192.168.1.32:5001/login-user'
            , userData).then(res => {
            console.log(res.data);
            if (res.data.status === 'ok') {
                Alert.alert('Logged In Successfully');
                AsyncStorage.setItem('token', res.data.data);
                AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                navigation.navigate('Home');
            } else {
                Alert.alert('Login Failed', res.data.message);
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    async function getData() {
        const data = await AsyncStorage.getItem('isLoggedIn');
        console.log(data, 'at app.jsx');
    }

    useEffect(() => {
        getData();
        console.log('Hii');
    }, []);

    const handleRegisterPress = () => {
        console.log('Register Pressed');
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.redBackground}>
                <Text style={styles.title}>VUI LÒNG ĐĂNG NHẬP</Text>
            </View>
            <SafeAreaView style={{ height: 690 }}>
                <View style={styles.loginForm}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text>thành viên mới? </Text>
                        <Pressable onPress={handleRegisterPress}>
                            <Text style={styles.registerText}>Đăng kí ngay</Text>
                        </Pressable>
                    </View>
                    <View style={styles.orContainer}>
                        <Image source={require('../img/G.png')} />
                        <Text>Or</Text>
                        <Image source={require('../img/F.png')} />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    redBackground: {
        backgroundColor: '#C72A2A',
        height: 400,
        width: 430,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 28,
        paddingTop: 80,
    },
    loginForm: {
        backgroundColor: '#C8BFBF',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        width: 360,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 30,
        width: '100%',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        height: 50,
    },
    button: {
        backgroundColor: '#FF8B6A',
        height: 60,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        fontWeight: 'bold',
        color: 'black',
    },
    orContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    }
});

export default LoginScreen;