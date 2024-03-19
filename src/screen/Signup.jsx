/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native'; // Import Text and TouchableOpacity
import {TextInput} from 'react-native-paper';
import axios from 'axios'; // Import axios properly
import Button from '../components/Button';

const SignupScreen = ({navigation}) => {
  // Receive navigation prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email format');
      return;
    }

    // Send signup request
    try {
      const response = await axios.post(
        'https://fragile-gold-tam.cyclic.app/auth/signup',
        {
          name,
          email,
          password,
        },
      );

      // Handle successful signup response
      console.log('Signup successful:', response.data);
      navigation.navigate('Login', {
        token: response.data?.token,
      });
    } catch (error) {
      // Handle signup error
      console.log('Signup error:', error);
      Alert.alert('Signup failed', 'Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
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
      <Button mode="contained" onPress={handleSignup} title={'Signup'} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Already have an account? Login</Text>
      </TouchableOpacity>
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
  text: {
    marginTop: 10,
    color: 'blue', // You can change the color to suit your design
  },
});

export default SignupScreen;
