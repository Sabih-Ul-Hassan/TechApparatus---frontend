import React, { useState, useEffect, useFocus } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import QuestionCard from './QuestionCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import { useFocusEffect } from '@react-navigation/native';
 
 
var HomeScreen = ({ route, navigation }) => {
  var [questions, setQuestions] = useState([]);
   useFocusEffect(
    React.useCallback(() => {
      axios
      .get('https://courageous-gown-dog.cyclic.app/question/')
      .then((res) => res.data.questions)
      .then((questions) => {
        setQuestions(questions);
      });
    }, [])
  );

  return (
    <View style={styles.screen}>
      {questions.length > 0 ? (
        <FlatList
          data={questions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Question', { question: item });
              }}>
              <QuestionCard question={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
          }}>
          Loading... 
        </Text>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1D1D1D',
    paddingHorizontal: 5,
    height: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
  },
});
export default HomeScreen;
