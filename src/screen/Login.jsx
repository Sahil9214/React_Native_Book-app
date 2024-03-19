/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from 'axios'; // Import axios properly
import Button from '../components/Button';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email format');
      return;
    }
    console.log(email, password);
    // Send login request
    try {
      const response = await axios.post(
        'https://fragile-gold-tam.cyclic.app/auth/login',
        {
          email,
          password,
        },
      );

      // Handle successful login response
      console.log('Login successful:', response.data);
      navigation.navigate('AdminBooks', {
        token: response.data?.token?.token,
      });
    } catch (error) {
      // Handle login error
      console.log('Login error:', error);
      Alert.alert('Login failed', 'Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry // Hides the input text
        style={styles.input}
      />
      <Button onPress={handleLogin} title={'Login'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '50%',
  },
});

export default LoginScreen;
