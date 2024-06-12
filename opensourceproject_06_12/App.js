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
            headerStyle : {backgroundColor:"#fff"},
            headerTitleStyle:{
              fontWeight : 'bold',
              color : "black"
            }
          }}/>
        <Stack.Screen name= "CommonUserPage" component={CommonUserPage}
        options = {{
            title : "일반 노인",
            headerStyle : {backgroundColor:"#fff"},
            headerTintColor:"pink",
            headerTitleStyle:{
              fontWeight : 'bold',
              color : "black"
            }
        }}/>
        <Stack.Screen name="BlindUserPage" component={BlindUserPage}
        options = {{
            title : "맹인",
            headerStyle : {backgroundColor:"#fff"},
            headerTintColor:"pink",
            headerTitleStyle:{
              fontWeight : 'bold',
              color : "black"
            }
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
