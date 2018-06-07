/**
 * Created by jimmivila on 12/1/17.
 */
import React, { Component } from 'react';
import firebase from './../firebase';
import {NavigationActions} from 'react-navigation'

import { View, Dimensions, Text, ScrollView, Image, TouchableWithoutFeedback, Platform, TextInput, Alert,ListView, TouchableHighlight, AsyncStorage } from 'react-native';


function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}


export default class Contactos extends Component{

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.state = {
            dataSource: ds
        };

        // this.contactsRef = firebase.database().ref('users');
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

        //console.log(this.state.data);

        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows([{ title: 'Jimmi' },{title:'Ragnar'}])
        // })
        AsyncStorage.getItem("USER_KEY").then((res) => {
            this.contactsRef = firebase.database().ref('users/'+res+'/contactos');
            this.listenForContacts(this.contactsRef);
        });

    }

    renderHeader()  {
        return (
            <View style={styles.header}>
                <View style={styles.menuProfile}>
                    <Image source={require('./../assets/img/profile.png')} style={styles.profilePic}/>
                </View>
                <View style={styles.chatCenter}>
                    <Text style={styles.textHeader}>Contactos</Text>
                </View>
                <View style={styles.searchIconView}>
                    <Image source={require('./../assets/img/search-icon.png')} style={styles.searchIcon}/>
                </View>
            </View>
        )
    }

    _renderItem(item) {

        const onPress = () => {

            // navigation.navigate('ChatScreen',{userId : item._key})

            this.props.navigation.dispatch(
                NavigationActions.navigate({routeName:'ChatScreen', params: {userId : item._key}})
            )

        };


        return (
            <ListItem item={item} onPress={onPress}/>
        );
    }

    render(){
        return (
            <View>
                {this.renderHeader()}
                <View>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)}/>

                </View>
            </View>
        )
    }

    listenForContacts(ref) {
        ref.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    // title: snap.val().nombre,
                    _key: child.key
                });
            });

            console.log(items);

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

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
        bottom: vw(Platform.OS === 'ios') ? vw(45) : vw(41),
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
    profileIcon:{
      flex: 1,
      resizeMode: 'contain',
      alignSelf: 'flex-start',
      position: 'absolute',
      left: 15,
      top: 9,
      width: 38,
      height: 38
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
        borderBottomColor: '#F2F4F5'
    },
    style_text: {
      fontFamily: 'GothamRounded-Medium',
      flex: 1,
      marginLeft: 80,
      fontWeight: 'bold',
      fontSize: 18,
      color: '#333333',
      alignSelf: 'center',
    },
}
