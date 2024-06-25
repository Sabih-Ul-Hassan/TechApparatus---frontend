import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var Tags = (props) => {
  return (
    <View style={styles.tagRow}>
      {props.tags &&
        props.tags.map((tag, index) => <Tag tag={tag} key={index} />)}
    </View>
  );
};

var Tag = (props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#364940',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        margin: 3,
        padding: 3,
      }}>
      <Text style={{ color: '#3AFFA1' }}>{props.tag}</Text>
    </View>
  );
};

const QuestionScreen = ({ navigation, route }) => {
  var [question, setQuestion] = useState(route.params.question);
  var [answerActive, setAnswerActive] = useState(false);
  var [answer, setAnswer] = useState('');
  var [user, setUser] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('user').then((x) => {
      setUser(JSON.parse(x));
    });
  }, []);
  return (
    <View style={styles.questionData}>
      <ScrollView>
        <Text style={styles.questionTitle}>{question.title}</Text>

        <Tags tags={question.tags} />
        <Text style={{ color: '#3AFFA1', fontSize: 18, fontWeight: 'bold' }}>
          Description:
        </Text>
        <Text style={styles.questionDescription}>{question.description}</Text>
        {question.code && (
          <>
            <Text
              style={{ color: '#3AFFA1', fontSize: 18, fontWeight: 'bold' }}>
              Code:
            </Text>
            <View style={styles.codeScreen}>
              <Text style={{ padding: 10, color: 'white' }}>
                {question.code}
              </Text>
            </View>
          </>
        )}
        <View style={styles.separator}></View>
        <Text style={styles.answerText}>Answers</Text>
        <View style={{ flexGrow: 1 }}>
          {question.answers ? (
            question.answers.map((item, index) => (
              <AnswerCard answer={item} key={index} />
            ))
          ) : (
            <Text>No Answers to show</Text>
          )}
        </View>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <TextInput
            style={{
              textAlignVertical: 'top',
              backgroundColor: '#262626',
              borderRadius: 7,
              color:'white',
              padding: 5,
            }}
            value={answer}
            onChangeText={setAnswer}
            placeholderTextColor="white"
            
            placeholder="Add Answer"
            multiline={answerActive}
            numberOfLines={answerActive ? 6 : 1}
            onFocus={() => {
              setAnswerActive(true);
            }}
            onBlur={() => {
              setAnswerActive(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if(!answer.trim()){
                alert('invalid input')
                return 
              }
              alert('submitting!');
              axios
                .put(
                  'https://courageous-gown-dog.cyclic.app/question/' +
                    question._id +
                    '/answer',
                  { username: user.username, description: answer }
                )
                .then((x) => {
                  question.answers.push({username:user.username,description:answer})
                  setQuestion({...question})
                  setAnswer('')
                  alert('submitted');
                });
            }}
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
            }}>
            <Text style={styles.label}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
var AnswerCard = (props) => {
  return (
    <View style={styles.answerCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.username}>{props.answer.username}</Text>
        <Text style={styles.email}>{props.answer.email}</Text>
      </View>
      <Text style={styles.description}> {props.answer.description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  username: {
    color: 'white',
    fontWeight: '900',
    fontSize: 17,
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 7 },

  label: {
    color: 'white',
    fontSize: 20,
  },
  email: {
    color: '#3AFFA1',
    fontSize: 10,
  },

  description: {
    color: 'white',
  },
  answerCard: {
    backgroundColor: '#364940',
    borderRadius: 20,
    marginVertical: 10,
    padding: 10,
  },
  separator: {
    borderBottomWidth: 0.6,
    borderRadius: 10,
    borderColor: '#3AFFA1',
    elevation: 8,
    shadowColor: '#3AFFA1',
    marginVertical: 2,
  },
  questionData: {
    width: '100%',
    paddingHorizontal: 14,
    backgroundColor: '#1D1D1D',
    height: '100%',
    display: 'flex',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
  },
  questionDescription: {
    color: 'white',
    fontSize: 15,
  },
  codeScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#848884',
    opacity: 0.4,
    borderRadius: 20,
    marginVertical: 10,
  },
  answerText: {
    color: 'white',
    fontSize: 12,
    margin: 8,
    fontWeight: 'bold',
  },
});
export default QuestionScreen;
