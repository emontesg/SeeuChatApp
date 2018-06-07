/**
 * Created by jimmivila on 12/4/17.
 */
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBN0o1WIOnaZDXfi_ayD3Uo55BPqTbAthU",
    authDomain: "seeu-soon.firebaseapp.com",
    databaseURL: "https://seeu-soon.firebaseio.com",
    projectId: "seeu-soon",
    storageBucket: "seeu-soon.appspot.com",
    messagingSenderId: "738545397423"
};

firebase.initializeApp(config);

export default firebase;