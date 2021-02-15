import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyC6CYOO2_w8NgDyI_0alTnxL2poWH_jSUE",
  authDomain: "rolosa-prueba.firebaseapp.com",
  databaseURL: "https://rolosa-prueba-default-rtdb.firebaseio.com",
  projectId: "rolosa-prueba",
  storageBucket: "rolosa-prueba.appspot.com",
  messagingSenderId: "773837603801",
  appId: "1:773837603801:web:e88043ada9c14c28e68fc8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
