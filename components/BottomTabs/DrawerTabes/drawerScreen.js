import React, { useState, useEffect } from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AskQuestion from './AskQuestion';
import SearchQuestion from './SearchQuestions';
import Settings from './Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';
const DrawerScreen = ({ navigation, route }) => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'black',
          opacity: 0.7,
        },
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: '#1D1D1D' },
        drawerActiveTintColor: '#3AFFA1',
        drawerActiveBackgroundColor: '#1D1D1D',
        drawerInactiveTintColor: 'white',
        headerTintColor:'white'

      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Ask Question" component={AskQuestion} />
      <Drawer.Screen name="Search Questions" component={SearchQuestion} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};
 
const Logout = ({ navigation, route }) => {
  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem('user').then((arg) => {
            alert(JSON.stringify(arg))
            navigation.replace('Login');
          });
        }}
      />
    </View>
  );
};

export default DrawerScreen;
