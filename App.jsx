import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllBooks from './src/screen/AllBooks';
import Login from './src/screen/Login';
import AddBooks from './src/screen/AddBooks';

import SignupScreen from './src/screen/Signup';
import AdminBooks from './src/screen/AdminBooks';
import UpdateBook from './src/screen/UpdateBook';

function App() {
  const Stack = createNativeStackNavigator();

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
