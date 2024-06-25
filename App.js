import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AfterLogin from './components/BottomTabs/AfterLogin';

import SignUpScreen from './components/signup';
import LoginScreen from './components/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuestionScreen from './components/QuestionScreen';
import LoadingScreen from './components/LoadingScreen';
var Stack = createNativeStackNavigator();
function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={'Loading'} 
          screenOptions={{
            headerStyle: {backgroundColor: '#1D1D1D'},
            headerTitleStyle: {color: 'white'},
            headerTintColor:'white'
          }}>
          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={{title: 'TechKit'}}
          />
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{title: 'TechKit'}}
          />
          <Stack.Screen name="Login" component={LoginScreen} options={{}} />
          <Stack.Screen
            name="AfterLogin"
            component={AfterLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Question"
            component={QuestionScreen}
            options={{}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
