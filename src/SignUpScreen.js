import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import Error from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit() {
    const userData = {
      name,
      email,
      mobile,
      password,
    };

    axios
      .post('http://192.168.1.32:5001/register' ,
        userData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Registered Successfully!!');
          navigation.navigate('Login'); 
        } else {
          Alert.alert(JSON.stringify(res.data));
        }
      })
      .catch(e => console.log(e));
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);

    if (nameVar.length > 1) {
      setNameVerify(true);
    }
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[0-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#C72A2A',
          height: 502,
          width: 512,
          top: -127,
          borderRadius: 200,
        }}
      />
      <View
        style={{
          backgroundColor: '#C8BFBF',
          top: -100,
          height: 451,
          width: 360,
          borderRadius: 12,
        }}
      >
        <View style={[styles.inputContainer, { top: 50 }]}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChange={e => handleName(e)}
          />
          {name.length < 1 ? null : nameVerify ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : (
            <Error name="error" color="red" size={20} />
          )}
        </View>
        {name.length < 1 ? null : nameVerify ? null : (
          <Text
            style={{
              marginLeft: 20,
              color: 'red',
            }}
          >
            Name should be more than 1 character.
          </Text>
        )}
        <View style={[styles.inputContainer, { top: 50 }]}>
          <TextInput
            placeholder="Phone"
            style={styles.input}
            onChange={e => handleMobile(e)}
            maxLength={10}
          />
          {mobile.length < 1 ? null : mobileVerify ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : (
            <Error name="error" color="red" size={20} />
          )}
        </View>
        {mobile.length < 1 ? null : mobileVerify ? null : (
          <Text
            style={{
              marginLeft: 20,
              color: 'red',
            }}
          >
            Phone number should be 10 digits.
          </Text>
        )}
        <View style={[styles.inputContainer, { top: 50 }]}>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            onChange={e => handleEmail(e)}
          />
          {email.length < 1 ? null : emailVerify ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : (
            <Error name="error" color="red" size={20} />
          )}
        </View>
        {email.length < 1 ? null : emailVerify ? null : (
          <Text
            style={{
              marginLeft: 20,
              color: 'red',
            }}
          >
            Enter a valid email address.
          </Text>
        )}
        <View style={[styles.inputContainer, { top: 50 }]}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChange={e => handlePassword(e)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {password.length < 1 ? null : !showPassword ? (
              <Feather
                name="eye-off" 
                style={{ marginRight: -10 }}
                color={passwordVerify ? 'green' : 'red'}
                size={23}
              />
            ) : (
              <Feather
                name="eye"
                style={{ marginRight: -10 }}
                color={passwordVerify ? 'green' : 'red'}
                size={23}
              />
            )}
          </TouchableOpacity>
        </View>
        {password.length < 1 ? null : passwordVerify ? null : (
          <Text
            style={{
              marginLeft: 20,
              color: 'red',
            }}
          >
            Password must be at least 6 characters long and include uppercase, lowercase, and a number.
          </Text>
        )}
        <View
          style={{
            backgroundColor: '#FF8B6A',
            height: 60,
            width: '60%',
            left: 70,
            borderRadius: 20,
            bottom: -50,
          }}
        >
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 30,
    width: 300,
    left: 30,
  },
  input: {
    flex: 1,
    padding: 10,
    height: 50,
    width: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    top: 15,
  },
});