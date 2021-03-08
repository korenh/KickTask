import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDL4Tsf--TOOw8XbH1YjN23lC6N4Yu_TFw",
  authDomain: "kicktask.firebaseapp.com",
  projectId: "kicktask",
  storageBucket: "kicktask.appspot.com",
  messagingSenderId: "1049641391441",
  appId: "1:1049641391441:web:0334e9ebb289669836ef70"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
