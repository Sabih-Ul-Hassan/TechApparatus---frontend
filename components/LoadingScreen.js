import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoadingScreen({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.replace('AfterLogin');
      } else navigation.replace('Login');
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Image
        style={styles.img}
        source={require('../Assets/Images/Component1.png')}
      />
      <Text style={styles.whiteLable}>Welcome To</Text>
      <View>
        <Text style={styles.blackLable}>tech</Text>
        <Text style={styles.greenLable}>Apparatus</Text>
      </View>
      <View> 
        <Text style={styles.whiteText}>
          A public platform building the definitive collection of coding
          questions & answers
        </Text>
      </View>
      <Image
        style={styles.img1}
        source={require('../Assets/Images/Component2.png')}
      />
      <ActivityIndicator style={styles.loader} size={50} color="#3AFFA1" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1D1D1D',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    position: 'absolute',
    top: 70,
    width: '100%',
  },
  img1: {
    position: 'absolute',
    right: 5,
    bottom: 100,
  },
  whiteLable: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
  },
  blackLable: {
    color: 'black',
    fontSize: 40,
    fontWeight: '500',
  },
  greenLable: {
    color: '#3AFFA1',
    fontSize: 40,
    fontWeight: '500',
  },
  whiteText: {
    color: 'white',
    padding: 30,
    fontSize: 12,
  },
  loader: {
    position: 'absolute',
    bottom: 50,
  },
});
