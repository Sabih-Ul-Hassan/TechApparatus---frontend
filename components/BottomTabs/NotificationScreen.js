import * as React from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var NotificationCard = props => {
  return (
    <View style={styles.notificationCard}>
      <Icon
        name="bell"
        size={25}
        color="#FFD700"
        style={{
          //  backgroundColor: '#1D1D1D',
          borderWidth: 0.3,
          borderColor: '#FFD700',
          alignSelf: 'center',
          borderRadius: 100,
          padding: 7,
          marginRight: 7,
        }}
      />
      <Text style={styles.text}>{props.notification.title}</Text>
    </View>
  );
};

var NotificationScreen = () => {
  return (
    <View style={styles.screen}>
      <NotificationCard
        notification={{
          title:
            'lorem ipsum  huobjj pih   l ej;k djipq hqihhkan dihf pqi pj lejsha hie ales fklhfiawh wghwilahf ih',
        }}
      />
      <NotificationCard
        notification={{
          title:
            'lorem ipsum  huobjj pih   l ej;k djipq hqihhkan dihf pqi pj lejsha hie ales fklhfiawh wghwilahf ih',
        }}
      />
      <NotificationCard
        notification={{
          title:
            'lorem ipsum  huobjj pih   l ej;k djipq hqihhkan dihf pqi pj lejsha hie ales fklhfiawh wghwilahf ih',
        }}
      />
      <NotificationCard
        notification={{
          title:
            'lorem ipsum  huobjj pih   l ej;k djipq hqihhkan dihf pqi pj lejsha hie ales fklhfiawh wghwilahf ih',
        }}
      />
      <NotificationCard
        notification={{
          title:
            'lorem ipsum  huobjj pih   l ej;k djipq hqihhkan dihf pqi pj lejsha hie ales fklhfiawh wghwilahf ih',
        }}
      />
      <NotificationCard
        notification={{
          title:
            'lorem ipsum  huobjj pih   l ej;k djipq hqihhkan dihf pqi pj lejsha hie ales fklhfiawh wghwilahf ih',
        }}
      />

      <Image
        source={require('../../Assets/Images/icon_08.png')}
        style={styles.image}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  text: {
    color: 'white',
    flex: 7,
  },
  image: {
    height: 150,
    width: 150,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    opacity: 0.5,
  },
  notificationCard: {
    backgroundColor: '#364940',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  screen: {
    backgroundColor: '#1D1D1D',
    height: '100%',
  },
});
export default NotificationScreen;
