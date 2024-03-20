/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllBooks from './src/screen/AllBooks';
import Login from './src/screen/Login';
import AddBooks from './src/screen/AddBooks';
import SignupScreen from './src/screen/Signup';
import AdminBooks from './src/screen/AdminBooks';
import UpdateBook from './src/screen/UpdateBook';
import TouchID from 'react-native-touch-id'; // Assuming TouchID is properly installed

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const Stack = createNativeStackNavigator();

  const optionalConfigObject = {
    unifiedErrors: false,
    passcodeFallback: false,
  };

  const handleBiometric = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          setIsAuth(true);
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate('', optionalConfigObject).then(success => {
            setIsAuth(true);
            console.log('success', success);
          });
          setIsAuth(true);
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
        setIsAuth(false);
      });
  };
  useEffect(() => {
    handleBiometric();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#007bff'},
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="AllBooks" component={AllBooks} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddBooks" component={AddBooks} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AdminBooks" component={AdminBooks} />
        <Stack.Screen name="UpdateBook" component={UpdateBook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
