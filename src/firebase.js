//npm install -g firebase-tools
//firebase login
//firebase init
//firebase deploy
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import { initializeApp } from 'firebase/app';
//import { getAuth ,GoogleAuthProvider } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqhxaavexuk1KTXCGqs8YTJq9sZK3cLnc",
    authDomain: "whatsapp-clone-66940.firebaseapp.com",
    projectId: "whatsapp-clone-66940",
    storageBucket: "whatsapp-clone-66940.appspot.com",
    messagingSenderId: "1034576981421",
    appId: "1:1034576981421:web:203418d9385ea1d1614524",
    measurementId: "G-97WZ5SH7KT"
  };
  
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
  export const auth = firebase.auth();
 //export  const db=getFirestore();
  // export const auth=getAuth();
  export const provider=new firebase.auth.GoogleAuthProvider();
 export default firebase
