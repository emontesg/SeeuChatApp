import './ReactotronConfig';
import React, { Component } from 'react';
import { StatusBar,Alert } from 'react-native';
import {NotLogged, LoggedIn, createRootNavigator} from './router'
import { isSignedIn } from './auth';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      signedIn : false,
        checkedSignIn:false
    };

    console.disableYellowBox = true
  }

  componentWillMount() {
    isSignedIn().then(res => this.setState({signedIn:res,checkedSignIn:true}))
        .catch(err=>alert("error"));
  }
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
      // Alert.alert('hi');
    // this.getContentFromcontentful();

  }

  render() {
    const {checkedSignIn,signedIn} = this.state;

    if (!checkedSignIn){
      return null;
    }

    const Layout = createRootNavigator(signedIn);

    return <Layout/>

    // if(signedIn){
    //   return <LoggedIn/>
    // }else{
    //   return <NotLogged/>
    // }

    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    //return (
      // <Provider store={store}>
      //  <NotLogged/>
     // <LoggedIn/>
        // </Provider>
    //);
  }
}
