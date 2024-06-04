import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BlindUserPage from './screens/BlindUserPage';
import CommonUserPage from './screens/CommonUserPage';
import FirstPage from './screens/FirstPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FirstPage" component={FirstPage}
        options = {{
            title : "시작 페이지",
            headerStyle : {backgroundColor:"green"},
            headerTintColor:"red",
            headerTitleStyle:{
              fontWeight : 'bold',
              color : "purple"
            }
          }}/>
        <Stack.Screen name= "CommonUserPage" component={CommonUserPage}
        options = {{
            title : "User Screen",
            headerStyle : {backgroundColor:"green"},
            headerTintColor:"red",
            headerTitleStyle:{
              fontWeight : 'bold',
              color : "purple"
            }
        }}/>
        <Stack.Screen name="BlindUserPage" component={BlindUserPage}
        options = {{
            title : "User Screen",
            headerStyle : {backgroundColor:"green"},
            headerTintColor:"red",
            headerTitleStyle:{
              fontWeight : 'bold',
              color : "purple"
            }
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
