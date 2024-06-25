import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const IconInput = props => {
  return (
    <View
      style={{
        margin: 2,
        borderBottomWidth: 1,
        borderColor: 'white',
        padding: 8.5,
        flexDirection: 'row',
        marginTop: 9,
        marginBottom: 20,
        alignItems: 'center',
      }}>
      <Icon
        name={props.icon}
        size={20}
        color={props.iconColor}
        style={{
          paddingRight: props.paddingRight,
          marginRight: props.marginRight,
          marginTop: props.marginTop,
        }}
      />
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : 'gray'
        }
        style={{
          color: props.color ? props.color : 'white',
        }}
        value={props.text}
        onChangeText={props.setText}
      />
    </View>
  );
};
export default IconInput;
