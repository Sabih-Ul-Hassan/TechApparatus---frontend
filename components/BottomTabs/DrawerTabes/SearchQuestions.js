import React, { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuestionCard from './QuestionCard';

var SearchQuestion = ({ route, navigation }) => { 
  var [search, setSearch] = useState('');
  var [questions, setQuestions] = useState([]);
  var [loading, setLoading] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://courageous-gown-dog.cyclic.app/question/' + search)
      .then((res) => {
        setQuestions(res.data.questions);
        setLoading(false);
      });
  }, [search]);
  return (
      <View style={styles.screen}>
    <ScrollView>
        <View
          style={[
            styles.inputField,
            { flexDirection: 'row', justifyContent: 'center' },
          ]}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={'search'} size={17} color="white" />
          </View>
          <TextInput
            placeholderTextColor="white"
            placeholder="Question"
            value={search}
            onChangeText={setSearch}
            style={[
              styles.inputField,
              {
                flex: 7,
                backgroundColor: '#0000',
                borderRadius: 0,
                padding: 0,
                margin: 0,
                marginVertical: 0,
                borderWidth: 0,
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              setSearch('')
            }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={'times'} size={17} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        {loading ? (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: 'white',
            }}>
            Loading
          </Text>
        ) : (
          questions.length> 0 ? (
          <Questions
            questions={questions}
            navigation={navigation}
            setQuestions={setQuestions}
          />
        ):  <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            color: 'white',
          }}>
          No Results Found
        </Text>)
        }
    </ScrollView> 
      </View> 
  );
};

var Questions = ({ questions, setQuestions, navigation }) => {
  
  return (
    <View>
      {questions.map((q, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('Question', { question: q });
          }}>
          <QuestionCard question={q} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1D1D1D',
    padding: 10,
    height:'100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
  },
  inputField: {
    borderRadius: 50,
    backgroundColor: '#262626',
    padding: 10,
    borderColor: '#3AFFA1',
    borderWidth: 1,
    marginVertical: 10,
    color: 'white',
    fontSize: 16,
  },
  divider: {
    borderWidth: 0.2,
    borderColor: 'yellow',
    elevation: 25,
    shadowColor: '#3AFFA1',
    margin: 15,
  },
});
export default SearchQuestion;
