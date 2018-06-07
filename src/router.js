import React, { Component } from 'react';
import { StackNavigator,TabNavigator } from 'react-navigation';
// import { Scene, Router, ActionConst } from 'react-native-router-flux';
import { View, Dimensions, Image, Platform} from 'react-native';
import CameraScreen from './components/Camera';
import Login from "./components/LogIn";
import Conversaciones from "./components/Conversaciones";
import Contactos from "./components/Contactos";
import Configuracion from "./components/Configuracion";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Account from "./components/Account";
import Notifications from "./components/Notifications";
import BlockUsers from "./components/BlockUsers";
import Terms from "./components/Terms";
import Support from "./components/Support";
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}


export const NotLogged = StackNavigator({

    LogIn : {
        screen: Login,
        navigationOptions: {
            title: "Ingresar",

        }
    }
});


export const LoggedIn = TabNavigator({

    Conversaciones: {
        screen: Conversaciones,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
             <Image
               source={require('./assets/img/chat-icon.png')}
               style={[styles.icon, {tintColor: tintColor}]}
             />
           ),
        }
    },
    Contactos : {
        screen: Contactos,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
           <Image
             source={require('./assets/img/contac-icon.png')}
             style={[styles.iconContac, {tintColor: tintColor}]}
           />
         ),
        }
    },
    Configuracion : {
        screen: Configuracion,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
           <Image
             source={require('./assets/img/config-icon.png')}
             style={[styles.icon, {tintColor: tintColor}]}
           />
         ),
        }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
     showLabel: false,
     showIcon: true,
     activeTintColor: '#022539',
     inactiveTintColor: '#022539',
     activeBackgroundColor: '#F1F3F4',
     inactiveBackgroundColor: '#FFFFFF',
     indicatorStyle: {
       backgroundColor: '#909496'
     },
     style: {
      borderColor: '#383802',
      height: vw(100),
      backgroundColor: '#FFFFFF'
    }
   },
});

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator({

            NotLogged : {
                screen: NotLogged,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            LoggedIn : {
                screen: LoggedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            ChatScreen : {
                screen: ChatScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            },
            Profile : {
                screen: ProfileScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            },
            Account : {
                screen: AccountScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            },
            Notifications : {
                screen: NotificationsScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            },
            BlockUsers : {
                screen: BlockUsersScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            },
            Terms : {
                screen: TermsScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            },
            Support : {
                screen: SupportScreen,
                navigationOptions : {
                    gesturesEnabled: true
                }
            }

        },
        {
            headerMode: "none",
            initialRouteName: signedIn ? "LoggedIn" : "NotLogged"
        }
    )
};


export const ChatScreen = StackNavigator({

   ChatScreen: {
       screen:Chat,
   }
});
export const SupportScreen = StackNavigator({

   SupportScreen: {
       screen:Support,
   }
});
export const BlockUsersScreen = StackNavigator({

   BlockUsersScreen: {
       screen:BlockUsers,
   }
});
export const NotificationsScreen = StackNavigator({

   NotificationsScreen: {
       screen:Notifications,
   }
});
export const AccountScreen = StackNavigator({

   AccountScreen: {
       screen:Account,
   }
});
export const ProfileScreen = StackNavigator({

   ProfileScreen: {
       screen:Profile,
   }
});
export const TermsScreen = StackNavigator({

   TermsScreen: {
       screen:Terms,
   }
});

const styles = {
  icon: {
    width: vw(Platform.OS === 'ios') ? vw(46) : vw(36),
    height: vw(Platform.OS === 'ios') ? vw(46) : vw(36),
    marginTop: vw(Platform.OS === 'ios') ? vw(13) : vw(38),
    position: 'absolute'
  },
  iconContac: {
    width: vw(30),
    height: vw(35),
    marginTop: vw(Platform.OS === 'ios') ? vw(18) : vw(28),
    position: 'absolute'
  },
};

// const RouterComponent = () => {
//   return (
//     <Router>
//       <Scene key="main">
// 	      <Scene key="camera" component={CameraScreen} hideNavBar initial/>
//       </Scene>
//     </Router>
//   );
// };
//
// export default RouterComponent;

// export const Tabs = TabNavigator({
//     LogIn: {
//         // screen: CameraScreen,
//
//     },
//     Main: {
//
//     }
//
// });
