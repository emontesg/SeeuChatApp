/**
 * Created by EstebaMontesDev.
 */
import React, { Component } from 'react';
import { onSignOut } from './../auth';
import {NavigationActions} from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import {HeaderBackButton} from 'react-navigation';
import {
    Button,
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
export default class Account extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: 'Account',
      headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white', marginRight:25,fontFamily:'GothamRounded-Medium', fontSize: 20 },
      titleStyle: {
        textAlign: 'center',
        alignSelf:'center'
      },
      headerStyle:{
          backgroundColor:'#F70F4D',
          height: 55
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor='white' />,
      headerRight: <View/>,
  });
  constructor(props){
      super(props);
  }

  render() {
    return(
      <View style={{flex:1, backgroundColor:'white'}}>
        <SettingsList
          borderColor='#ECEFEE'>
            <SettingsList.Item
            style={styles.itemContainer}
            titleStyle={styles.items}
            titleInfoStyle={styles.items}
            itemWidth={50}
            title='Language'

            onPress = {() => this.props.navigation.dispatch(
                NavigationActions.navigate({routeName:'Language'})
            )}
          />
          <SettingsList.Item
            style={styles.itemContainer}
            titleStyle={styles.items}
            titleInfoStyle={styles.items}
            itemWidth={50}
            title='Privacy'

            onPress = {() => this.props.navigation.dispatch(
                NavigationActions.navigate({routeName:'Privacy'})
            )}
          />
          <SettingsList.Item
            style={styles.itemContainer}
            titleStyle={styles.items}
            titleInfoStyle={styles.items}
            itemWidth={50}
            title='Password'

            onPress = {() => this.props.navigation.dispatch(
                NavigationActions.navigate({routeName:'Password'})
            )}
          />
          <SettingsList.Item
            style={styles.itemContainer}
            titleStyle={styles.itemsL}
            titleInfoStyle={styles.items}
            itemWidth={50}
            title='Log out'

            onPress = {() => this.props.navigation.dispatch(
                NavigationActions.navigate({routeName:'LogOut'})
            )}
          />

        </SettingsList>
      </View>
    );
  }
}

const styles = {
  items : {
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    height: 35,
    marginTop:  25,
    marginBottom: 0
  },
  itemsL : {
    color: 'red',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    height: 35,
    marginTop:  25,
    marginBottom: 0
  },
}
