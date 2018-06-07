import React, {Component} from 'react';
import { View, Dimensions, Text, ScrollView, Image, TouchableWithoutFeedback, Platform, TextInput, Alert } from 'react-native';


function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}


class Home extends Component {
  constructor(props){
    super(props);
  }


  renderHeader()  {
    return (
      <View style={styles.header}>
        <View style={styles.menuProfile}>
          <Image source={require('./../assets/img/profile.png')} style={styles.profilePic}/>
        </View>
        <View style={styles.chatCenter}>
          <Text style={styles.textHeader}>Chats</Text>
        </View>
        <View style={styles.searchIconView}>
          <Image source={require('./../assets/img/search-icon.png')} style={styles.searchIcon}/>
        </View>
      </View>

    )
  }
  render(){
    return (
      <View>
        {this.renderHeader()}
      </View>
    )
  }
}

const styles = {
  header: {
    height: vw(115),
    backgroundColor: '#F70F4D',
    elevation: 2,
    position: 'relative'
  },
  menuProfile: {
  alignSelf: 'flex-start'
  },
  chatCenter: {
    alignItems: 'center',
    bottom: vw(Platform.OS === 'ios') ? vw(52) : vw(48),
  },
  textHeader: {
    fontFamily: 'GothamRnd-Medium',
    fontSize: vw(32),
    marginBottom: vw(Platform.OS === 'ios') ? vw(32) : vw(28),
    color: 'white'
  },
  profilePic: {
    width: vw(70),
    height: vw(70),
    marginTop: (Platform.OS === 'ios') ? vw(32) : vw(28),
    marginLeft: vw(30)
  },
  searchIconView: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? vw(50) : vw(46),
    left: vw(570)
  },
  searchIcon: {
    width: vw(39),
    height: vw(39)
  },
}

export default Home;
