import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QuestionScreen from '../QuestionScreen';
import Profile from './Profile';
import NotificationScreen from './NotificationScreen';
import DrawerScreen from './DrawerTabes/drawerScreen';
const Tab = createBottomTabNavigator();

const AfterLogin = () => {
  return (
    <Tab.Navigator
      initialRouteName="Drawers"
      screenOptions={{
        headerStyle: {backgroundColor: '#1D1D1D'},
        headerTitleStyle: {color: 'white'},
        tabBarStyle: {backgroundColor: '#1d1d1d'},
        tabBarActiveTintColor: '#3AFFA1',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Drawers"
        component={DrawerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={33} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" size={size} color={color} />
          ),
          //
        }}
        component={NotificationScreen}
        // component={QuestionScreen}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AfterLogin;
