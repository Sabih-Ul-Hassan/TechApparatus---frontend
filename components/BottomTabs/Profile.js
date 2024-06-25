import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({ navigation }) => {
  var [questions, setQuestions] = useState([]);
  var [user, setUser] = useState([]);
  var [deleted, setDeleted] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('user').then((user1) => {
        user1 = JSON.parse(user1);
        axios
          .get('https://courageous-gown-dog.cyclic.app/user/' + user1._id)
          .then((res) => res.data.user)
          .then((user2) => {
            AsyncStorage.setItem('user', JSON.stringify(user2)).then((x) => {
              setUser(user2);
              setQuestions(user2.questions);
            });
          });
        // setQuestions(user.questions);
      });
    }, [])
  );
  useEffect( ()=>{
      AsyncStorage.getItem('user').then((user1) => {
        user1 = JSON.parse(user1);
        axios
          .get('https://courageous-gown-dog.cyclic.app/user/' + user1._id)
          .then((res) => res.data.user)
          .then((user2) => {
            AsyncStorage.setItem('user', JSON.stringify(user2)).then((x) => {
              setUser(user2);
              setQuestions(user2.questions);
            });
          });
        // setQuestions(user.questions);
      });
    }, [deleted])
  

  return (
    <View style={styles.profileScreen}>
      <ScrollView>
        <ProfileCard user={user} />
        <View style={styles.separator}></View>
        <Text style={styles.questionText}>Questions</Text>
        {questions &&
          questions.map((item, index) => (
            <QuestionCard deleted={deleted} question={item} key={index} navigation={navigation} setDeleted={setDeleted} />
          ))}
      </ScrollView>
    </View>
  );
};
const UserData = (props) => {
  return (
    <View>
      <View style={styles.coloum1}>
        <Text style={styles.userDataText}>{props.field}</Text>
        <Text style={styles.userHeadingsText}>{props.text}</Text>
      </View>
    </View>
  );
};
const QuestionData = (props) => {
  return (
    <View>
      <View style={styles.QuestionDetails}>
        <Text style={styles.questionDataText}>{props.field}</Text>
        <Text style={styles.questionHeadingsText}>{props.text}</Text>
      </View>
    </View>
  );
};

const ProfileCard = ({ user }) => {
  var [username, setUsername] = useState();
  var [answers, setAnswers] = useState();
  var [questions, setQuestions] = useState();
  var [reputation, setReputation] = useState();
  var [email, setEmail] = useState();
  var [location, setLocation] = useState();
  var [memberSince, setMemberSince] = useState();
  useEffect(() => {
    AsyncStorage.getItem('user').then((user1) => {
      user1 = JSON.parse(user1);
      setUsername(user1.username);
      setEmail(user1.email);
      setLocation(user1.location);
      setAnswers(user1.answers);
      setReputation(user1.reputation);
      setQuestions(user1.questions.length);
      setMemberSince(user1.memberSince);
    });
  }, [user]);

  return (
    <View>
      <View style={styles.profileCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.profileAvatar}></View>
          </View>

          <UserData field={'50'} text="answers" />
          <UserData field={questions} text="questions" />
          <UserData field={'X'} text="reputation" />
        </View>

        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.location}>
          <Icon
            name="map-pin"
            size={13}
            color="red"
            // 10 10 5
          />

          {'  ' + location}
        </Text>
        <Text style={styles.memberSince}>Member Since: {memberSince}</Text>
      </View>
    </View>
  );
};

const QuestionCard = (props) => {
  return (
    <View
      style={[styles.QuestionCard, { display: 'flex', flexDirection: 'row' }]}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Question', { question: props.question })
        }
        style={[{ flex: 10 }]}>
        <Text style={styles.QuestionCardTitle}>
          {props.question.title.substring(0, 45) +
            (props.question.title.length > 45 ? '...' : '')}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          {
            // <QuestionData field={props.question.votes} text="votes" />
            // <QuestionData field={props.question.answersNo} text="answers" />
            // <QuestionData field={props.question.views} text="views" />
          }
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          var yes=false
          Alert.alert(
            'Confirmation',
            'You wanna delete this question?', // <- this part is optional, you can pass an empty string
            [{ text: 'yes', onPress: () => {
              axios.delete('https://courageous-gown-dog.cyclic.app/question/'+props.question._id)
              .then(data=>{
                alert("deleted successfully!")
                props.setDeleted(!props.deleted)
              })


            } },
            { text: 'no', onPress: () => {} }],
            { cancelable: false }
          );
         
        }}>
        <Icon
          name="minus-square"
          size={20}
          color="red"
          // 10 10 5
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  questionText: {
    color: 'white',
    fontSize: 12,
    margin: 8,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 0.5,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 10,
    shadowColor: 'white',
  },
  QuestionCard: {
    backgroundColor: '#364940',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  QuestionCardTitle: {
    color: 'white',
    fontSize: 14,
  },
  QuestionDetails: {
    fontSize: 10,
    color: '#3AFFA1',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  coloum1: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionDataText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  questionHeadingsText: {
    fontSize: 10,
    color: '#3AFFA1',
  },
  userDataText: {
    justifyContent: 'space-between',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  userHeadingsText: {
    fontSize: 10,
    color: '#3AFFA1',
  },
  username: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
    marginTop: 8,
  },
  email: {
    fontSize: 10,
    color: '#3AFFA1',
  },
  location: {
    color: 'white',
    fontSize: 13,
  },
  memberSince: {
    fontSize: 12,
    color: 'white',
  },
  profileCard: {
    marginHorizontal: 10,
    backgroundColor: '#1D1D1D',
    marginTop: 10,
    borderRadius: 30,
    padding: 15,
    justifyContent: 'center',
  },
  profileScreen: {
    backgroundColor: '#1D1D1D',
    height: '100%',
  },
  profileAvatar: {
    backgroundColor: 'white',
    height: 90,
    width: 90,
    borderRadius: 100,
  },
});
export default Profile;
