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
    ScrollView,
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
export default class Terms extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: 'Terms & conditions',
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
      <View style={{flex:1, backgroundColor:'white'}}>
          <Image style={styles.imgBlock} source={require('./../assets/img/seeui.png')}/>
          <Text style={styles.txtS}>seeu</Text>
          <ScrollView style={styles.txtTerms}>
            <Text>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc

            </Text>
          </ScrollView>
      </View>
    );
  }
}

const styles = {
  imgBlock: {
    alignSelf: 'center',
    marginTop: 20,
    width: 40,
    height: 40
  },
  txtTerms: {
    backgroundColor: '#F4F4F4',
    marginRight: 15,
    marginLeft: 15,
    height: vh(10)
  },
  txtS: {
    color: '#F70F4D',
    fontFamily: 'GothamRounded-Medium',
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 17
  }

}
