/**
 * Created by jimmivila on 12/4/17.
 */
import {AsyncStorage} from "react-native";
import firebase from './firebase';
export const USER_KEY = "auth-key";
// export const onSignIn = () => AsyncStorage.setItem("USER_KEY","true");
export const onSignIn = (username,pass) => {

    var exists = null;

    console.log(username, pass);

    if(username !=='' && pass !== '') {

        var user = firebase.database().ref(('users/' + username));

        return user.once('value').then(function (snapshot) {
            exists = snapshot.val();

            console.log(snapshot.val());

            if (exists !== null) {
                console.log('true');
                return AsyncStorage.setItem("USER_KEY",snapshot.val().nombre);

            } else {
                console.log('false');
                firebase.database().ref('users/'+username).set({nombre:username,clave:pass,contactos:{}});
                return Promise.resolve();
            }
        });

    }else{
        return Promise.resolve();
    }

    // firebase.database().ref('users/'+username).set({nombre:username,pass:pass});

    // return AsyncStorage.setItem("USER_KEY","true");

    // return Promise.resolve()

};

export const onSignOut = () => AsyncStorage.removeItem("USER_KEY");

export const isSignedIn = () => {
  return new Promise((resolve,reject)=>{
      AsyncStorage.getItem("USER_KEY").then(res => {
          if(res !== null){
              resolve(true);
          }else{
              resolve(false);
          }
      }).catch(err => reject(err));
  });
};

