import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    databaseURL: 'https://parcelpal-85e75-default-rtdb.firebaseio.com',
    apiKey: "AIzaSyDxFK4wjLt01PX5N9uuLFKP9Fzt1beW6MY",
    authDomain: "parcelpal-85e75.firebaseapp.com",
    projectId: "parcelpal-85e75",
    storageBucket: "parcelpal-85e75.appspot.com",
    messagingSenderId: "575523337203",
    appId: "1:575523337203:web:577d1b4268f42fa5af5886",
    measurementId: "G-GLKN6CJLLG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };