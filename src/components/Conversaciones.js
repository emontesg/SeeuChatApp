/**
 * Created by jimmivila on 12/1/17.
 */
import firebase from './../firebase';
import React, {Component} from 'react';
import { View, Dimensions, Text, ScrollView, Image, TouchableWithoutFeedback, Platform, TextInput, Alert,ListView, FlatList, TouchableHighlight, AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}


export default class Conversaciones extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    componentDidMount() {
        // var user = firebase.database().ref(('users'));
        //
        //  this.state.data = user.once('value').then(function (snapshot) {
        //     contacts = snapshot.val();
        //     console.log(snapshot.val());
        //
        //     var resul = [];
        //     for(var key in contacts){
        //         resul.push({name:key})
        //     }
        //
        //     console.log(resul);
        //      this.state.data =contacts;
        //     return contacts;
        //
        // });

        // console.log(this.state.data);

        //this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows([{ title: 'Jimmi' },{title:'Ragnar'}])
        // })
        AsyncStorage.getItem("USER_KEY").then((res) => {
            this.chatsRef = firebase.database().ref('users/'+res+'/chats');
            this.listenForChats(this.chatsRef);
        });
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

    _renderItem = ({item}) => {

        const onPress = () => {
            this.props.navigation.dispatch(
                NavigationActions.navigate({routeName:'ChatScreen', params: {userId : item._key, chatId:item.idChat}})
            )
        };

        return (
            <ListItem item={item} onPress={onPress}/>
        );
    }

    render(){
        return (
          <View style={{flex: 1}}>
            {this.renderHeader()}
            <FlatList
              data={this.state.data}
              keyExtractor={item => item._key}
              renderItem={this._renderItem}
              style={{flex: 1}} />
          </View>
        )
    }

    listenForChats(ref) {
        ref.on('value', (snap) => {

           // get children as an array
            var items = [];

           snap.forEach((child) => {
            //
            //     let chatRef = firebase.database().ref(‘chats/’+child.val().idChat);
            //     chatRef.on(‘value’,(sna)=>{
            //
            //         items.push({
            //             idChat: child.val().idChat,
            //             _key: child.key,
            //             lastMessage: sna.val().lastMessage,
            //             lastMessageSender: sna.val().lastMessageSender,
            //             createdAt: sna.val().createdAt,
            //         });
            //
            //         console.log(items);

           //  this.setState({
            //      dataSource: this.state.dataSource.cloneWithRows(items)
            //  });
            //  });

               items.push({
                    idChat: child.val().idChat,
                    _key: child.key
                });
            });


           this.setState({
                data: items
            });

           console.log(items);

       });
    }
}


class ListItem extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.style_row_view}>
                    <Image source={require('./../assets/img/user-icon.png')} style={styles.profileIcon}/>
                    <Text style={styles.style_text}>{this.props.item._key}</Text>
                    <Text style={styles.msgText}>Mensaje</Text>
                    <Text style={styles.txtTime}>2:18 pm</Text>
                    <View style={styles.numMsg}>
                      <Text style={styles.txtNumMsg}>2</Text>
                    </View>
                    <Image source={require('./../assets/img/seeu.png')} style={styles.seuuMsg}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    header: {
        height: vw(130),
        backgroundColor: '#F70F4D',
        elevation: 2,
        position: 'relative'
    },
    menuProfile: {
        alignSelf: 'flex-start'
    },
    chatCenter: {
        alignItems: 'center',
        bottom: vw(Platform.OS === 'ios') ? vw(45) : vw(55),
    },
    textHeader: {
        fontFamily: 'GothamRounded-Medium',
        fontSize: vw(37),
        marginBottom: vw(Platform.OS === 'ios') ? vw(32) : vw(28),
        color: 'white'
    },
    profilePic: {
        width: vw(70),
        height: vw(70),
        marginTop: (Platform.OS === 'ios') ? vw(38) : vw(34),
        marginLeft: vw(30)
    },
    searchIconView: {
        position: 'absolute',
        top: (Platform.OS === 'ios') ? vw(55) : vw(51),
        left: vw(570)
    },
    searchIcon: {
        width: vw(39),
        height: vw(39)
    },

    style_row_view: {
        flex: 1,
        flexDirection: 'row',
        height: 57,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.5,
        borderBottomColor: '#F2F4F5',
    },
    style_text: {
        fontFamily: 'GothamRounded-Medium',
        flex: 1,
        marginLeft: 80,
        bottom: 8,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333333',
        alignSelf: 'center',
    },
    msgText: {
      color: 'rgb(153, 153, 153)',
      position: 'absolute',
      left: 80,
      top: 30

    },
    txtNumMsg: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      top: 3
    },
    txtTime: {
      color: 'rgb(153, 153, 153)',
      position: 'absolute',
      left: 310,
      bottom: 30,
    },
    numMsg: {
      backgroundColor: '#15D1AD',
      width: 20,
      height: 20,
      position: 'absolute',
      left: 342,
      top: 30,
      borderRadius: 100/2,
      borderColor: '#15D1AD'
    },
    seuuMsg: {
      flex: 1,
      resizeMode: 'contain',
      alignSelf: 'flex-start',
      position: 'absolute',
      width: 20,
      height: 20,
      top: 30,
      left: 315
    },
    profileIcon:{
      flex: 1,
      resizeMode: 'contain',
      alignSelf: 'flex-start',
      position: 'absolute',
      left: 15,
      top: 9,
      width: 38,
      height: 38
    }
}

// const styles = StyleSheet.create({
//     style_row_view: {
//         flex: 1,
//         flexDirection: 'row',
//         height: 57,
//         backgroundColor: '#FFFFFF',
//     },
//     style_text: {
//         flex: 1,
//         marginLeft: 12,
//         fontSize: 16,
//         color: '#333333',
//         alignSelf: 'center',
//     },
//
// });
