import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconInput from './iconInput';
import axios from 'react-native-axios';
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
    marginTop: 40,
    color: 'white',
  },

  createAccountText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 1,
  },
  createAccountText2: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 0,
  },
});
var SignUpScreen = ({ navigation }) => {
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
          <Text style={styles.createAccountText}>Create</Text>
          <Text style={styles.createAccountText2}>an account</Text>
        </View>
        <IconInput
          icon="user"
          iconColor="grey"
          placeholder="username"
          paddingRight={10}
          marginRight={10}
          marginTop={5}
          text={username}
          setText={setusername}
        />

        <IconInput
          icon="lock"
          iconColor="grey"
          placeholder="Password"
          paddingRight={10}
          marginRight={10}
          marginTop={5}
          text={passfield}
          setText={setPassfield}
        />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.registerText}>Register</Text>
          <TouchableOpacity
            style={styles.loginButton}
            disabled={username.trim() == '' || passfield.trim() == '' ? true : false}
            onPress={async () => {
              try {
                if (username == '' || passfield == '') {
                  alert('Fill the feilds!');
                  return;
                }
                axios.post('https://courageous-gown-dog.cyclic.app/user/signUp', {
                     username: username,
                    password: passfield,
                })
                  .then((res) => {
                    if (res.data.added) {
                      alert('Signed up successfully');
                      navigation.navigate('Login');
                    } else alert('invalid credentials!');
                  });
              } catch (e) {
                alert(e);
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
          <Text style={{ color: 'white' }}>Already have an account?</Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.replace('Login');
            }}>
            <Text style={{ color: '#3AFFA1' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
