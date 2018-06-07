/**
 * Created by EstebaMontesDev.
 */
import React, { Component } from 'react';
import { onSignOut } from './../auth';
import {NavigationActions} from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import {HeaderBackButton} from 'react-navigation';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {
    Button,
    TextInput,
    TouchableHighlight,
    View,
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
export default class Support extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: 'Support',
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
      this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return(
      <View style={{flex:1, backgroundColor:'white'}}>
        <Image style={styles.imgSuport} source={require('./../assets/img/suport.png')}/>
        <Text style={styles.txtHed}>We love to hear what you think, what
          we do well and what we could do better</Text>
          <AutoGrowingTextInput
              minHeight={120}
              maxHeight={160}
              placeholderTextColor='#C7C7CD'
              style={styles.txtin}
              placeholder={'Message'}
          />
          <TouchableHighlight
           style={styles.button}>
             <Text style={styles.txtButton}>Send</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  imgSuport: {
    alignSelf: 'center',
    width: 130,
    height: 62,
    marginTop: 20
  },
  txtin: {
    backgroundColor: '#F4F4F4',
    alignSelf: 'center',
    fontFamily: 'GothamRounded-Medium',
    padding: 5,
    height: 360,
    width: 320,
    color: 'black',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10

  },
  button: {
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: '#F70F4D',
    height: 30,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: 80
  },
  txtButton: {
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
  },
  txtHed: {
    fontFamily: 'GothamRounded-Medium',
    color: '#022539',
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    width: 200
  }
}
