import Camera from 'react-native-camera';
import React, { Component } from 'react';
import firebase from '.././firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import {HeaderBackButton} from 'react-navigation'

var StaticContainer = require('react-static-container');

import jss from 'jss';
import {
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
  Alert,
  Dimensions,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { GiftedChat, Bubble, Send} from 'react-native-gifted-chat'
import MessageImage from "react-native-gifted-chat/src/MessageImage";
import MessageImageCustom from "./MessageImageCustom";
import Actions from "./Actions";
import InputToolbar from "./InputToolbar";
import Composer from "./Composer";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('posts').child(imageName)
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}

export default class Chat extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.userId}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'white', fontFamily:'GothamRounded-Medium', fontSize: 20 },
        headerStyle:{
            backgroundColor:'#F70F4D'
        },
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor='white' />
    });

    constructor(props){
        super(props);
        this.state = {
            chatExist : false,
            isLoading : true,
            photo:null,
            messages:[]
        };

        this.seeuMessage = false;

        this.imageClicked = false;

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    componentDidMount(){

        AsyncStorage.getItem("USER_KEY").then((res) => {
            this.idUser = res;

            this.idChatRef = firebase.database().ref('users/'+res+'/chats/'+this.props.navigation.state.params.userId);

            this.idChatRef.once('value', (snap) => {

                // get children as an array

                if(snap.val()!=null) {
                    var items = [];
                    snap.forEach((child) => {
                        items.push({
                            idChat: child.val(),
                            _key: child.key
                        });
                    });
                    this.chatId = items[0].idChat;
                }else{
                    this.chatId = false;
                }

                if(this.chatId){
                    this.listenMessagesFromServer(firebase.database().ref('messages/'+this.chatId));

                    this.setState({
                        isLoading:false,
                        chatExist:true
                    });

                    console.log('ya existe el chat')
                }else{
                    this.setState({
                        isLoading:false,
                        chatExist:false
                    });
                }

            });

        });

    }

    renderSend(props) {
      return (
          <Send
              {...props}
          >
              <View style={styles.sendButton}>
                  <Image source={require('./../assets/img/send.png')} resizeMode={'center'}/>
              </View>
          </Send>
      );
    }

    renderImage(props){
        console.log(props)
        return (
            <MessageImageCustom {...props}

                seconds='5'
                chatProps={{chatId:this.chatId}}
                didOpen={()=>{

                    // console.log(props.currentMessage)
                    if(props.currentMessage.user._id!==this.idUser && !this.imageClicked) {

                            var del = {};
                            del['messages/' + this.chatId + '/' + props.currentMessage._id] = null;

                            //firebase.database().ref().update(del);

                        return del;
                        // Alert.alert('here am i');
                        // setTimeout(() => {
                        //     console.log('?????')
                        //
                        // }, 5000);
                        // this.tictac(10,false);
                        // imageClicked = true;
                    }else{
                        return false;
                    }

                }}

            />
        );
    }

    renderBubble (props) {
      return (
        <Bubble
          {...props}
            renderMessageImage={this.renderImage.bind(this)}

            // onLongPress={()=>{
            //     Alert.alert('ya no, ya noooo!')
            // }}
          wrapperStyle={{
            right: {
              backgroundColor: '#D9F4EF'
            },
            left:{
              backgroundColor: '#F1F3F4'
            }
          }}
          textStyle={{
            right: {
              color: '#022539'
            },
            left:{
              color: '#022539'
            }
          }}
        />
      )
    }
    renderComposer(props) {
    return (
        <Composer
            {...props}
            style={styles.txtMsg}
        />

        )
    };
    renderInputToolbar(props) {
    return (
      <InputToolbar
          {...props}

        />
        )
    };
    renderActions(props) {
    return (
        <Actions
            {...props}
        />

        )
    };

    renderButtonImage(props){
        return <Button title="bb" onPress={console.log('mamamia')}/>
    }

    onSend(messages = []) {

        var firebaseTimestamp = firebase.database.ServerValue.TIMESTAMP;
        var messageId = firebase.database().ref().push().key;

        if(this.state.chatExist){

            var updates = {};

            updates['chats/'+this.chatId] = { lastMessageSender:messages[0].user._id, lastMessage:messages[0].text ? messages[0].text:"seeu", createdAt:firebaseTimestamp };

            ////////SEEEU
            if(this.seeuMessage) {
                updates['messages/' + this.chatId + '/' + messageId] = {
                    name: messages[0].user._id,
                    createdAt: firebaseTimestamp,
                    message: messages[0].text,
                    seeuMessage : true
                };
                this.seeuMessage = false;

            }else{

                if(messages[0].image === undefined ) {

                    updates['messages/' + this.chatId + '/' + messageId] = {
                        name: messages[0].user._id,
                        createdAt: firebaseTimestamp,
                        message: messages[0].text,
                    };
                }else {
                    console.log(messages);
                    updates['messages/' + this.chatId + '/' + messageId] = {
                        name: messages[0].user._id,
                        createdAt: firebaseTimestamp,
                        image: messages[0].image
                    };
                }
            }

            firebase.database().ref().update(updates);


        }else{
            var firstMessageChatKey = firebase.database().ref().push().key;

            var updates = {};
            updates['chats/'+firstMessageChatKey] = { lastMessageSender:messages[0].user._id, lastMessage:messages[0].text, createdAt:firebaseTimestamp };

            // ///////SEEEU
            //
            // if(this.seeuMessage){
            //
            // }else{
            //     updates['messages/'+firstMessageChatKey+'/'+messageId]={name:messages[0].user._id,createdAt:firebaseTimestamp, message:messages[0].text};
            // }

            updates['users/'+this.idUser+'/chats/'+this.props.navigation.state.params.userId] = {  idChat :firstMessageChatKey };
            updates['users/'+this.props.navigation.state.params.userId+'/chats/'+this.idUser] = {  idChat :firstMessageChatKey };

            updates['messages/'+firstMessageChatKey+'/'+messageId] = {name: messages[0].user._id, createdAt: firebaseTimestamp, message: messages[0].text,}


            firebase.database().ref().update(updates);

            this.chatId = firstMessageChatKey;

            this.listenMessagesFromServer(firebase.database().ref('messages/'+this.chatId));

            this.setState({
                chatExist : true
            })
        }
    }

    render() {

        if (this.state.isLoading){
            return <Text></Text>
        }

        console.log('rendering');

        return (

            <View style={{flex: 1}}>

                <StaticContainer>
                    <View style={{flex:0.01}}>
                        <Camera
                            ref={(cam) => {
                                this.camera = cam;
                                console.log('camarada')
                            }}
                            style={styles.preview}
                            aspect={Camera.constants.Aspect.fill}
                            captureTarget={Camera.constants.CaptureTarget.temp}
                            type={Camera.constants.Type.front}>
                        </Camera>
                        <View style={styles.hide}></View>
                    </View>
                </StaticContainer>


                <GiftedChat
                    renderSend={this.renderSend.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderBubble={this.renderBubble.bind(this)}
                    renderComposer={this.renderComposer.bind(this)}
                    renderInputToolbar= {this.renderInputToolbar.bind(this)}
                    renderActions={this.renderActions.bind(this)}
                    user={{
                        _id: this.idUser,
                    }}
                    placeholder="Escribe un mensaje"
                    renderAvatar={null}
                />


            </View>

        );

    }

    takePicture() {
        if(this.camera!==null) {
            console.log('take a picture');
            const options = {};
            //options.location = ...
            this.camera.capture({metadata: options}).then((data) => {

                this.setState({photo: data.path});

                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, [{
                        _id: 1994,
                        user: {_id: this.idUser},
                        createdAt: Date.now(),
                        image: data.path
                    }]),
                }));

                var imageName = firebase.database().ref().push().key;


                uploadImage(data.path,imageName).then( (link) => {
                    this.onSend([{
                        user:{_id:this.idUser},
                        image: link,
                    }]);
                });
            })
                .catch(err => console.log(err));
            console.log('finish take a picture');

        }
    }

    listenMessagesFromServer(ref){
        ref.on('value', (snap) => {
            console.log('sigo aqui!!!!!');
            // console.log(snap.val());

            // get children as an array
            var items = [];
            snap.forEach((child) => {

                if (child.val().image === undefined) {
                    items.push({
                        _id: child.key,
                        user: {_id: child.val().name},
                        createdAt: new Date(child.val().createdAt),
                        text: child.val().message,
                        seeu: child.val().seeuMessage
                    });
                }else{
                    items.push({
                        _id: child.key,
                        user: {_id: child.val().name},
                        createdAt: new Date(child.val().createdAt),
                        text: child.val().message,
                        image: child.val().image,
                        seeu: child.val().seeuMessage
                    });
                }
            });

            // console.log(items);

            items = items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            this.setState((previousState) => ({
                messages: items,
            }));

            this.checkForSeeU(items[0]);
        });
    }

    checkForSeeU(lastMessage){
        console.log(lastMessage);
        if(lastMessage.seeu && lastMessage.user._id !== this.idUser){
            firebase.database().ref('messages/' + this.chatId+'/'+lastMessage._id+'/seeuMessage').set(null);

            setTimeout(() => {
                this.takePicture();
            }, 5000);

        }
    }

    componentWillUnmount() {
        firebase.database().ref('messages/'+this.chatId).off();
    }

}

const styles =  {
  chat: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
  sendContainer: {
    position: 'relative',
    marginRight: Platform.select({
      ios: 40,
      android: 55,
    }),
    marginBottom: 38,
    width: 2,
    height: 2
  },
  btnSend: {
    width: Platform.select({
      ios: vw(56),
      android: vw(56),
    }),
    height: Platform.select({
      ios: vh(5),
      android: vh(5),
    }),
  },
  txtMsg: {
    backgroundColor: 'red'

  },

    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    hide: {
        position: 'absolute',
        width: vw(640),
        height: vh(100),
        backgroundColor: '#fff'
    },
    photo: {
        width: vw(640),
        height: vh(100),
    }
}

const {classes} = jss.createStyleSheet(styles).attach();
