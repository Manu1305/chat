import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login';
import Register from './Screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Chat from './Screens/Chat';

const Stack = createNativeStackNavigator()
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='login'
          component={Login} />
        <Stack.Screen
          name='register'
          component={Register} />
        <Stack.Screen
          name='home'
          component={Home}
          options={{ 
            headerBackVisible: false,
             title: 'Active users',
            headerTitleAlign:'center',
          headerTitleStyle:{
            fontWeight:'900'
          } }} 
          
          />
         <Stack.Screen 
         name='chat'
         component={Chat}
         options={({route})=>({
          headerBackVisible:false,
          title:route.params.name,
          headerBackTitleStyle:{fontWeight:'bold'
           }, headerTitleAlign: 'center'
         })}
         
         />
      </Stack.Navigator>

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100

  },

});