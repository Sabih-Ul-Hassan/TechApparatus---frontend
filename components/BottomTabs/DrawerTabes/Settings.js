import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {create} from 'react-test-renderer';

var Settings = () => {
  return (
    <View style={styles.settingsBack}>
      <View style={styles.row1}>
        <SettingsCard title=" Edit username"></SettingsCard>
        <SettingsCard title=" Edit password"></SettingsCard>
        <SwitchComponent title="Show Questions"></SwitchComponent>
        <SwitchComponent title="Show Answers"></SwitchComponent>
      </View>
      <Image
        source={require('../../../Assets/Images/icon_08.png')}
        style={styles.image}
      />
    </View>
  );
};
var SettingsCard = props => {
  return (
    <View style={styles.settingsCard}>
      <Text style={styles.settingCardTitleText}>{props.title}</Text>
      <TouchableOpacity>
        <Icon
          name="arrow-right"
          size={20}
          color={'white'}
          style={styles.iconStyle}></Icon>
      </TouchableOpacity>
    </View>
  );
};
var SwitchComponent = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={styles.settingsCard}>
      <Text style={styles.settingCardTitleText}>{props.title}</Text>
      <Switch
        trackColor={{false: '#D3D3D3', true: '#AFEED0'}}
        thumbColor={isEnabled ? '#3AFFA1' : '#D3D3D3'}
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row1: {},
  image: {
    height: 180,
    width: 180,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    opacity: 0.8,
    marginBottom: 40,
  },
  iconStyle: {
    marginRight: 20,
    marginTop: 10,
  },
  settingsBack: {
    backgroundColor: '#1D1D1D',
    height: '100%',
  },
  settingsCard: {
    backgroundColor: '#364940',
    margin: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  settingCardTitleText: {
    padding: 15,
    color: 'white',
    fontSize: 16,
  },
});
export default Settings;
