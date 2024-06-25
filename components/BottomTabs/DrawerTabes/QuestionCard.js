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

var QuestionCard = (props) => {
  return (
    <View style={styles.questionCard}>
      <View style={styles.row}>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          style={styles.img}
        />
        <Text style={styles.titleText}>
          {props.question.title.substring(0, 68) +
            (props.question.title.length > 68 ? '...' : '')}
        </Text>
      </View>
      <Tags tags={props.question.tags} />
      {
      //   <View style={styles.row}>
      //   <Text style={styles.greenText}>{props.question.views} views</Text>
      //   <Text style={styles.greenText}>{props.question.votes} votes</Text>
      //   <Text style={styles.greenText}>{props.question.answersNo} answers</Text>
      // </View>
      }
      <Text style={{ color: 'white', fontSize: 16 }}>
        {props.question.description.substring(0, 381) +
          (props.question.description.length > 381 ? '...' : '')}
      </Text>
    </View>
  );
};
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
        backgroundColor: '#1D1D1D',
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

var styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1D1D1D',
    padding: 10,
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 7 },
  questionCard: {
    backgroundColor: '#364940',
    marginVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
    paddingHorizontal: 10,
  },
  img: { height: 50, width: 50, borderRadius: 100 },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
  },
  greenText: {
    color: '#3AFFA1',
    marginRight: 30,
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
export default QuestionCard;
