/**
 * Created by EstebaMontesDev.
 */
import React, { Component } from 'react';
import { onSignOut } from './../auth';
import {NavigationActions} from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import {HeaderBackButton} from 'react-navigation'
import {
    Button,
    View,
    Switch,
    Image,
    TextInput,
    Dimensions,
    Text,
    Platform
} from 'react-native';

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}
export default class Notifications extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: 'Notifications',
      headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white', fontFamily:'GothamRounded-Medium', fontSize: 20 },
      headerStyle:{
          backgroundColor:'#F70F4D',
          height: 55
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor='white' />,
      headerRight: <View/>
  });
  constructor(props){
      super(props);
  }

  render() {
    return(
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>Show notification</Text>
          <Switch
            style={styles.sw}
            onTintColor='#F70F4D'
            placeholder="Esteban"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>Vibrate</Text>
            <Switch
              style={styles.sw}
              onTintColor='#F70F4D'
              placeholder="Esteban"
            />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>Sounds</Text>

        </View>
      </View>
    );
  }
}

const styles = {
  sw: {
    marginTop: vh(1.5)
  },
  textStyle: {
    fontFamily: 'GothamRounded-Medium',
    color: 'black',
    fontSize: 17,
    marginLeft: vw(30),
    width: vw(500),
    marginTop: vh(2.5)
  },
  inputStyle: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ECEFEE',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    height: vh(8)
  },
}
