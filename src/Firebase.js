// Importing "firebase" object from firebase npm package
import firebase from 'firebase';

// Configuration for project
const firebaseConfig = {
    apiKey: "AIzaSyDuBVEZmGCjSNP0rXmGhuw-M21Sb78Xon0",
    authDomain: "ju-query-c1d9c.firebaseapp.com",
    projectId: "ju-query-c1d9c",
    storageBucket: "ju-query-c1d9c.appspot.com",
    messagingSenderId: "1005789934770",
    appId: "1:1005789934770:web:f38c0341d465bfb687c5ab",
    measurementId: "G-YZTLX0WW03"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const db = firebaseApp.firestore();

export { auth, googleProvider, facebookProvider };
export default db;