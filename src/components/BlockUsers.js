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
export default class BlockUsers extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: 'Blocked',
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
      <View style={{flex:1}}>
        <View style={styles.inputContainer}>
          <Image style={styles.imgBlock} source={require('./../assets/img/blocker.png')}/>
          <Text style={styles.textStyle}>Ricardo Monge</Text>
          <TouchableOpacity>
            <Text style={styles.txtX}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.add}>Add new...</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontFamily: 'GothamRounded-Medium',
    color: 'black',
    fontSize: 17,
    marginLeft: vw(30),
    width: vw(450),
    marginTop: vh(3)
  },
  add: {
    fontFamily: 'GothamRounded-Medium',
    color: 'red',
    fontSize: 17,
    marginTop: vh(3),
    marginLeft: vw(30)
  },
  imgBlock: {
    width: 40,
    height: 40,
    marginTop: 9,
    marginLeft: 5,
    resizeMode: 'contain'
  },
  txtX: {
    color: '#F70F4D',
    marginTop: vh(3),
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16
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
    height: vh(10)
  },
}
