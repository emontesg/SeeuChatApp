/**
 * Created by jimmivila on 12/1/17.
 */
import React, { Component } from 'react';
import { onSignOut } from './../auth';
import {NavigationActions} from 'react-navigation';
import SettingsList from 'react-native-settings-list';


import {
    Button,
    View,
    Image,
    Dimensions,
    Text,
    Platform
} from 'react-native'

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}

export default class Configuracion extends Component{

  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false};
  }

    renderHeader()  {
        return (
            <View style={styles.header}>
              <Text style={styles.txtHeader}>Settings</Text>
            </View>
        )
    }
    onValueChange(value){
      this.setState({switchValue: value});
    }
    render(){
        const {navigation} = this.props;

        return (
            <View style={{ flex : 1 , backgroundColor: 'white'}}>
              {this.renderHeader()}
              <SettingsList style={styles.item}
                borderColor='#ECEFEE'
                  >
                  <SettingsList.Item
                  style={styles.itemContainer}
                  titleStyle={styles.items}
                  titleInfoStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:30, width:30}} source={require('./../assets/img/profiles.png')}/>
                    </View>
                  }
                  itemWidth={50}
                  title='Profile'

                  onPress = {() => this.props.navigation.dispatch(
                      NavigationActions.navigate({routeName:'Profile'})
                  )}
                />
                <SettingsList.Item
                  titleStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:10,width:28,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:31, width:22}} source={require('./../assets/img/account.png')}/>
                    </View>
                  }
                  onPress = {() => this.props.navigation.dispatch(
                      NavigationActions.navigate({routeName:'Account'})
                  )}
                  hasNavArrow={true}
                  title='Account'/>
                <SettingsList.Item
                  titleStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:28, width:28}} source={require('./../assets/img/notifications.png')}/>
                    </View>
                  }
                  onPress = {() => this.props.navigation.dispatch(
                      NavigationActions.navigate({routeName:'Notifications'})
                  )}
                    hasNavArrow={true}
                    title='Notifications'/>
                <SettingsList.Item
                  titleStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:28, width:28}} source={require('./../assets/img/busers.png')}/>
                    </View>
                  }
                  onPress = {() => this.props.navigation.dispatch(
                      NavigationActions.navigate({routeName:'BlockUsers'})
                  )}
                    hasNavArrow={true}
                    title='Block Users'/>

                <SettingsList.Item
                  titleStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:9,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:30, width:32}} source={require('./../assets/img/friends.png')}/>
                    </View>
                  }
                    hasNavArrow={true}
                    title='Invite Friends'/>
                <SettingsList.Item
                  titleStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:28, width:28}} source={require('./../assets/img/terms.png')}/>
                    </View>
                  }
                  onPress = {() => this.props.navigation.dispatch(
                      NavigationActions.navigate({routeName:'Terms'})
                  )}
                    hasNavArrow={true}
                    title='Terms & Conditions'/>
                <SettingsList.Item
                  titleStyle={styles.items}
                  icon={
                    <View style={{height:30,marginLeft:10,alignSelf:'center'}}>
                      <Image style={{alignSelf:'center',height:28, width:28}} source={require('./../assets/img/support.png')}/>
                    </View>
                  }
                  onPress = {() => this.props.navigation.dispatch(
                      NavigationActions.navigate({routeName:'Support'})
                  )}
                    hasNavArrow={true}
                    title='Support'/>
              </SettingsList>
            </View>
        );
    }
}

const styles = {
  header: {
      height: vw(130),
      backgroundColor: '#F70F4D',
      elevation: 2,
      color: 'white',
      position: 'relative',
      alignItems: 'center'
  },
  item: {
    height: vh(15)
  },
  itemContainer: {
    height: vh(15)
  },
  items : {
    color: 'black',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    height: 35,
    marginTop:  25,
    marginBottom: 0
  },
  txtHeader: {
      alignItems: 'center',
      fontFamily: 'GothamRounded-Medium',
      fontSize: vw(37),
      marginTop: vh(Platform.OS === 'ios') ? vh(6) : vh(3),
      color: 'white'
  },
}
