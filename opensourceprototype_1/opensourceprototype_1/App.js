import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './screens/MainPage';
import FirstPage from './screens/FirstPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FirstPage" component={FirstPage}/>
        <Stack.Screen name="MainPage" component={MainPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
