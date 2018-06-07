/**
 * Created by jimmivila on 12/1/17.
 */
import React, { Component } from 'react';
import { onSignIn,isSignedIn } from './../auth'
import { NavigationActions } from 'react-navigation';

import {
    View,
    Button,
    TextInput,
    Alert
} from 'react-native'

export default class LogIn extends Component{


    constructor(props){
        super(props)
        // this.state.user = {name:null,pass:null};
        this.state = {
            username: '',
            password: '',
        };
    }


    render(){
        const {navigation} = this.props;

        return (

            <View style={{ paddingVertical: 20 }}>
                <TextInput
                    placeholder={'Nombre Usuario'}
                    returnKeyLabel={'next'}
                    onChangeText={(text) => this.setState({username:text})}
                />
                <TextInput
                    placeholder={'Contraseña'}
                    secureTextEntry={true}
                    returnKeyLabel={'next'}
                    onChangeText={(text) => this.setState({password:text})}
                />
                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Ingresar"
                    onPress={() =>{

                        onSignIn(this.state.username,this.state.password).then(() => navigation.dispatch(
                            isSignedIn().then(res => {
                                if(res) {
                                    navigation.navigate('LoggedIn')

                                    NavigationActions.reset({
                                        index: 0,
                                        key: null,
                                        actions: [
                                            NavigationActions.navigate('LoggedIn')
                                        ]
                                    });
                                    console.log('something happened')
                                }else{
                                    {Alert.alert('Error','Datos Incorrectos')}
                                }
                            })

                        ))
                    }}
                />
            </View>
        );
    }
}