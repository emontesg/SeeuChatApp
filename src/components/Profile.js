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
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    Text,
    DatePickerIOS,
    Platform
} from 'react-native';

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}
export default class Configuracion extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
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
      this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  render() {
    return(
      <View>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={require('./../assets/img/profileSettings.png')}/>
          <TouchableOpacity>
              <Text style={styles.changeImage}>Change profile photo</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>Name</Text>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              style={styles.inputStyle}
              placeholder="Esteban"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>Gender</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Esteban"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>Birth date</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Esteban"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>E-mail</Text>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              style={styles.inputStyle}
              placeholder="estebanm_g@outlook.com"
            />
          </View>
      </View>
    );
  }
}

const styles = {
  profileImageContainer: {
    alignSelf : 'center',
    marginTop: 20,

  },
  inputsScreen: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    fontFamily: 'GothamRounded-Medium',
    color: 'black',
    fontSize: 17,
    marginLeft: vw(30),
    width: vw(200),
    marginTop: vh(2.5)
  },
  inputStyle: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
    width: Platform.select({
      android: vw(380),
    })
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ECEFEE',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    height: vh(8)
  },
  profileImage: {
    height: 120,
    width: 120,
    marginLeft: vw(30),
    marginBottom: vh(2)
  },
  changeImage: {
    fontFamily: 'GothamRounded-Medium',
    color: 'red'
  }

}
