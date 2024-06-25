import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconInput from './iconInput';
const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#3AFFA1',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 23,
    marginLeft: 150,
    padding: 10,
    borderRadius: 40,
    width: 60,
    height: 60,
    elevation: 15,
    shadowColor: '#3AFFA1',
  },
  registerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 35,
    color: 'white',
  },

  welcomeBackText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  welcomeBackText2: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 0,
  },
});
var LoginScreen = ({ navigation }) => {
  var [username, setusername] = useState('');
  var [passfield, setPassfield] = useState('');
  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: '#1D1D1D',
        height: '100%',
        width: '100%',
      }}>
      <View style={{ width: '80%' }}>
        <View>
          <Text style={styles.welcomeBackText}>Welcome</Text>
          <Text style={styles.welcomeBackText2}>back</Text>
        </View>
        <IconInput
          icon="user"
          iconColor="grey"
          placeholder="Username"
          setText={setusername}
          text={username}
          paddingRight={10}
          marginRight={10}
          marginTop={5}
        />

        <IconInput
          icon="lock"
          iconColor="grey"
          placeholder="Password"
          setText={setPassfield}
          text={passfield}
          paddingRight={10}
          marginRight={10}
          marginTop={5}
        />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.registerText}>Sign In</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
              alert('Wait!')
              try {
                if (username.trim() == '' || passfield.trim() == '') {
                  alert('Fill the feilds!');
                  return;
                }
                var res = await axios.post(
                  'https://courageous-gown-dog.cyclic.app/user/login1',
                  {
                    username: username,
                    password: passfield,
                  }
                );

                if (res.data.loggedin) {

                  await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                  alert('Logged successfully');
                  setPassfield('')
                  setusername('')
                  navigation.navigate('AfterLogin');
                } else alert('invalid credentials!');
              } catch (e) {
                // alert(e);
              }
            }}>
            <Icon
              name="sign-in"
              size={28}
              color="white"
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 80,
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Sign Up');
            }}>
            <Text style={{ color: '#3AFFA1' }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
