// Importing "firebase" object from firebase npm package
import firebase from 'firebase';

// Configuration for project
const firebaseConfig = {
    apiKey: "",
    authDomain: "ju-query-c1d9c.firebaseapp.com",
    projectId: "ju-query-c1d9c",
    storageBucket: "ju-query-c1d9c.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const db = firebaseApp.firestore();

export { auth, googleProvider, facebookProvider };
export default db;
