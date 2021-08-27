import firebase from 'firebase';

// Configuration for project

const firebaseConfig = {
    apiKey: "AIzaSyDuBVEZmGCjSNP0rXmGhuw-M21Sb78Xon0",
    authDomain: "ju-query-c1d9c.firebaseapp.com",
    projectId: "ju-query-c1d9c",
    storageBucket: "ju-query-c1d9c.appspot.com",
    messagingSenderId: "1005789934770",
    appId: "1:1005789934770:web:99e36a8a6532a26f87c5ab",
    measurementId: "G-JXHW20YRKV"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;