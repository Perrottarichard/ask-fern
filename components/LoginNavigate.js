import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Stack = createStackNavigator();

const LoginNavigate = () => (
  <Stack.Navigator
    initialRouteName="LoginForm"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="LoginForm" component={LoginForm}
    />
    <Stack.Screen
      name="RegisterForm" component={RegisterForm}
    />
  </Stack.Navigator>
);
export default LoginNavigate;
