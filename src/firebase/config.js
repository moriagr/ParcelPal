import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getFirestore } from 'firebase/firestore';

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

// if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
// }
// Initialize Auth and provide persistence
// auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Use LOCAL for AsyncStorage

export const auth = firebase.auth();

export const database =firebase.firestore();

export default firebase;