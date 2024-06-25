import React, {useState,useEffect} from 'react';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default AskQuestion = ({navigation}) => {
  var [user,setUser]=useState({})
  var [title, setTitle] = useState('');
  var [prompt, setPrompt] = useState('');
  var [code, setCode] = useState('');
  var [tag, setTag] = useState('');
  var [tags, setTags] = useState([]);

    useEffect(()=>{
      AsyncStorage.getItem('user').then(user=>JSON.parse(user)).then(user=>{
        setUser(user)})
    },[])

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView>
        <View
          style={{display: 'flex', alignItems: 'center', marginVertical: 20}}>
          <View>
            <Text style={{color: 'white', fontWeight: '900', fontSize: 50}}>
              ASK
            </Text>
            <Text style={{color: '#3AFFA1', fontWeight: '400', fontSize: 40}}>
              Questions?
            </Text>
          </View>
        </View>
        <Text style={styles.label}>Title*</Text>
        <TextInput
          placeholderTextColor="white"
          placeholder="Write title"
          value={title}
          onChangeText={setTitle}
          style={styles.inputField}
        />
        <Text style={styles.label}>Propmt*</Text>
        <TextInput
          placeholderTextColor="white"
          placeholder="Write Prompt"
          value={prompt}
          onChangeText={setPrompt}
          style={styles.inputField}
          multiline={true}
          numberOfLines={7}
        />
        <Text style={styles.label}>Code</Text>
        <TextInput
          placeholderTextColor="white"
          placeholder="Write Code"
          value={code}
          onChangeText={setCode}
          style={styles.inputField}
          multiline={true}
          numberOfLines={7}
        />
        <Text style={styles.label}>TAG</Text>
        <View style={[styles.inputField, {flexDirection: 'row'}]}>
          <TextInput
            placeholderTextColor="white"
            placeholder="Tags"
            value={tag}
            onChangeText={setTag}
            style={[
              styles.inputField,
              {
                flex: 7,
                borderRightWidth: 1,
                borderRightColor: 'white',
                borderRadius: 0,
                padding: 0,
                margin: 0,
                marginVertical: 0,
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              setTags([...tags, tag]);
              setTag('');
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'check'} size={17} color="#3AFFA1" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {tags.map((tag, index) => (
            <Tag
              tag={tag}
              key={index}
              onPress={() => {
                tags.splice(index, 1);
                setTags([...tags]);
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 9,
            borderColor: '#3AFFA1',
            alignItems: 'center',
            padding: 10,
            marginVertical: 20,
            elevation: 10,
            shadowColor: '#3AFFA1',
            backgroundColor: '#1D1D1D',
          }}
          onPress={()=>{
            if(!title.trim() || !prompt.trim()) {
              alert("fill the required feilds!")
              return 
            } 
            alert('wait!')
            axios.post('https://courageous-gown-dog.cyclic.app/question/'+user._id+'/add',{title,description:prompt,tags,code}).then(x=>{
              alert('question added!')
              setPrompt('')
              setTitle('')
              setTags([]) 
              setTag('')
              setCode('')
              navigation.navigate('Home') 
              navigation.navigate('profile')
            }) 
          }}
          >
          <Text style={styles.label}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

var Tag = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#364940',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        alignSelf: 'flex-start',
        margin: 3,
        padding: 3,
      }}>
      <Text style={{color: '#3AFFA1'}}>{props.tag} | </Text>
      <Icon name="times-circle" size={17} color="#3AFFA1" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1D1D1D',
    height: '100%',
    paddingHorizontal: 10,
  },
  label: {
    color: 'white',
    fontSize: 20,
  },
  inputField: {
    borderRadius: 12,
    backgroundColor: '#262626',
    padding: 10,
    marginVertical: 10,
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
